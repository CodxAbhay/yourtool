-- 1. Profiles Table (Extends Auth.Users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  user_id uuid references auth.users on delete cascade, -- null for global/public categories
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Links Table (Personal Workspace)
create table links (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  url text not null,
  title text,
  description text,
  favicon_url text,
  category_id uuid references categories on delete set null,
  type text default 'website' check (type in ('tool', 'website')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tools Directory (Hidden Gems - Public)
create table tools_directory (
  id uuid default gen_random_uuid() primary key,
  url text not null unique,
  title text not null,
  description text,
  favicon_url text,
  category text, -- Deprecated in favor of category_id
  category_id uuid references categories(id) on delete set null,
  upvotes integer default 0,
  type text default 'tool' check (type in ('tool', 'website')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Submissions Table (User submissions for the directory)
create table submissions (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  title text not null,
  description text,
  favicon_url text,
  category text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  type text default 'tool' check (type in ('tool', 'website')),
  user_id uuid references auth.users on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FUNCTIONS
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role = 'admin'
  );
end;
$$ language plpgsql security definer;

create or replace function increment_upvotes(row_id uuid)
returns void as $$
begin
  update tools_directory
  set upvotes = upvotes + 1
  where id = row_id;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS POLICIES

-- Profiles: Users can read/write their own profile. Admin can read all.
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (is_admin());

-- Categories: Users can see global categories and their own.
alter table categories enable row level security;
create policy "Viewable by owner or global" on categories for select using (user_id is null or auth.uid() = user_id);
create policy "Users can create own categories" on categories for insert with check (auth.uid() = user_id);
create policy "Admins can manage categories" on categories
  for all
  using (is_admin())
  with check (is_admin());

-- Links: Users can only see/edit their own links.
alter table links enable row level security;
create policy "Users can view own links" on links for select using (auth.uid() = user_id);
create policy "Users can manage own links" on links for all using (auth.uid() = user_id);

-- Tools Directory: Everyone can read. Only admins can write.
alter table tools_directory enable row level security;
create policy "Everyone can view tools" on tools_directory for select using (true);
create policy "Admins can manage tools" on tools_directory
  for all
  using (is_admin())
  with check (is_admin());

-- Submissions: Users can view their own submissions. Admin can see all and update.
alter table submissions enable row level security;
create policy "Users can view own submissions" on submissions for select using (auth.uid() = user_id);
create policy "Users can create submissions" on submissions for insert with check (true); -- Public or logged in
create policy "Admins can manage submissions" on submissions
  for all
  using (is_admin())
  with check (is_admin());

-- 6. Contact Messages Table
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table contact_messages enable row level security;
create policy "Anyone can insert contact messages" on contact_messages for insert with check (true);
create policy "Admins can view contact messages" on contact_messages for select using (is_admin());

-- MIGRATION NOTES (Run these if you have existing tables)
-- ALTER TABLE tools_directory ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id) ON DELETE SET NULL;
