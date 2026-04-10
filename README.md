# SkillAlert SA

A clean, mobile-first web app that helps South Africans (especially in Johannesburg/Gauteng) sign up once and receive personalized employment, learnership, upskilling, and government opportunity alerts straight to WhatsApp or SMS—completely free.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL) + Server Actions
- **AI**: OpenAI or Groq for personalized alert generation
- **Icons**: lucide-react

## Project Structure

```
skillalert/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page + sign-up CTA
│   └── globals.css              # Global Tailwind styles
├── components/
│   └── sign-up-form.tsx         # Sign-up form component with validation
├── actions/
│   └── sign-up.ts               # Server Action for form submission
├── lib/
│   ├── supabase.ts              # Supabase client (browser + server)
│   └── validations.ts           # Zod schemas for form validation
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

## Quick Start

### 1. Clone & Install

```bash
cd /workspaces/SkillAlert
npm install --legacy-peer-deps
```

### 2. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Get your **Project URL** and **Anon Key** from Settings → API
3. Get your **Service Role Key** from Settings → API (keep this secret!)
4. Go to **SQL Editor** and run this to create tables:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  skill_level TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create opportunities table
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location_tags TEXT[] NOT NULL,
  stipend_info TEXT,
  closing_date DATE,
  official_link TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "allow_read_opportunities" ON opportunities FOR SELECT USING (true);
CREATE POLICY "allow_insert_users" ON users FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_opportunities_category ON opportunities(category);
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# From Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Choose one AI provider
OPENAI_API_KEY=sk-...
# OR
GROQ_API_KEY=gsk_...

# Admin auth
ADMIN_PASSWORD=skillalert2026
```

### 4. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

## Features (Phase 1) ✅

### Landing Page
- Hero section with value proposition
- Trust signals (free, personalized, real SA opportunities)
- Sections explaining what opportunities we cover

### Sign-Up Form
- Full name validation
- South African phone number validation (supports +27 and 0 prefix)
- Location selection (Johannesburg, Gauteng, Other SA)
- Multi-select interests (11 options)
- Skill level selection (Beginner, Some Coding, Intermediate)
- POPIA-compliant consent checkbox
- Real-time Zod validation
- Server Action form submission (secure, no service_role key exposed)
- Success/error messages with visual feedback

### Database Schema
- **users table**: Stores signups with all profile data, created_at timestamp
- **opportunities table**: Ready for seed data and admin additions

## Next Steps (Phase 2-7)

- [ ] Admin page (/admin) with password protection
- [ ] Users listing in admin
- [ ] Form to add new opportunities
- [ ] Seed data with real April 2026 opportunities
- [ ] "Generate Sample Alert" button (AI integration)
- [ ] WhatsApp/SMS integration (Twilio or similar)

## Key Architecture Decisions

### Server Actions (No API Routes)
- Form submission uses `handleSignUp()` Server Action
- All Supabase queries run server-side
- Service role key never exposed to browser

### Zod Validation
- Comprehensive schema in `lib/validations.ts`
- Real-time client validation via react-hook-form
- Server-side validation before Supabase insert

### Tailwind + shadcn/ui
- Mobile-first responsive design
- Accessible form components
- lucide-react icons for visual polish

## Development Notes

### Phone Number Validation
- Accepts: `+27123456789`, `+27 123 456 789`, `0123456789`
- Regex: `^(\+27|0)[0-9]{9}$`

### Error Handling
- Form validation errors shown inline
- Supabase errors (e.g., duplicate phone) caught and displayed
- Loading states on submit button

### Environment
- Uses `.env.local` (never commit!)
- `.env.example` shows all required variables
- `NEXT_PUBLIC_*` prefix only for client-visible variables

## Troubleshooting

**Build errors with tailwindcss?**
- Run `npm install --legacy-peer-deps` to fix React 19 compatibility

**Server Action not found?**
- Ensure `'use server'` is at top of `actions/sign-up.ts`
- Clear `.next` folder: `rm -rf .next`

**Supabase connection failed?**
- Check `.env.local` has correct URLs and keys
- Verify RLS policies are enabled on tables

---

Built for South African job seekers. **Never miss an opportunity again.**