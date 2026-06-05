ALTER TABLE links ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'website' CHECK (type IN ('tool', 'website'));
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'website' CHECK (type IN ('tool', 'website'));
ALTER TABLE tools_directory ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'tool' CHECK (type IN ('tool', 'website'));
