# yourtool.in

A modern, high-performance tools directory and personal workspace platform. Built with **Astro 6**, **Supabase**, and **Tailwind CSS v4**, and designed with a stark, developer-centric aesthetic inspired by Vercel.

---

## ✨ Features

### 🛠 Tools Directory (Hidden Gems)
- **Curation:** A public directory of hand-picked tools and resources.
- **Submissions:** Community-driven tool submissions with an approval workflow.
- **Engagement:** Built-in upvoting system for discovering popular resources.
- **Categorization:** Sophisticated tagging and category management.

### 🏠 Personal Workspace
- **Bookmark Management:** Save and organize your own links and resources.
- **Private Categories:** Create personal folders for your bookmarks.
- **Synced Experience:** Access your links across any device with Supabase Auth.

### 🛡 Admin Dashboard
- **Review System:** Dedicated interface for approving or rejecting submissions.
- **Content Management:** Full control over categories and directory listings.
- **Profile Overviews:** Manage user roles and system-wide settings.

---

## 🚀 Tech Stack

- **Framework:** [Astro 6](https://astro.build/) (SSR on Cloudflare Workers)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **Typography:** Geist (Geometric Sans & Mono)

---

## 🛠 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/yourtool.in.git
cd yourtool.in
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add your Supabase credentials:

```env
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
# Required for database seeding:
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Database Setup
1. Execute the SQL schema found in `SUPABASE_SCHEMA.sql` in your Supabase SQL Editor.
2. (Optional) Seed the database with initial categories and tools:
   ```bash
   node seedDatabase.js
   ```

### 4. Local Development
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) to see the site in action.

---

## 🎨 Design Language

This project strictly adheres to the design principles outlined in `DESIGN.md`.

- **Minimalism:** Stark black-and-ink duet on a near-white canvas.
- **Atmospheric Decoration:** Multi-color mesh gradients used sparingly at hero scale.
- **Precision Typography:** Negative-tracked headlines and monospaced technical labels.
- **Subtle Depth:** Stacked shadows and hairline borders for a crisp, engineered feel.

---

## 📦 Deployment

The project is optimized for **Cloudflare Workers**.

```bash
npm run deploy
```

This will build the project and deploy it using Wrangler. Ensure you have the Cloudflare adapter configured in `astro.config.mjs`.

---

## 📄 License

[MIT](LICENSE) © 2026 yourtool.in
