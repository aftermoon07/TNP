<div align="center">
  <h1>🎓 TNP Placement Portal</h1>
  <p>An AI-powered Training & Placement management platform for students, mentors, and recruiters.</p>

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
  ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Resume Builder** | Generate and customize professional resumes with AI assistance |
| 📊 **ATS Score Analyzer** | Check resume compatibility against any job description |
| 🗺️ **Career Roadmap Generator** | Get a personalized placement prep roadmap (OpenAI + Gemini) |
| 💻 **Code Playground** | Browser-based IDE with multi-language support |
| 🎤 **Mock Interview (Voice)** | AI-powered voice mock interviews via VAPI |
| 📝 **Quizzes & Leaderboard** | Topic-wise quizzes with competitive leaderboard |
| 📅 **Time Planner** | Task and schedule management for placement prep |
| 🏢 **Recruiter Job Portal** | Post and manage job openings; students can apply directly |
| 👥 **Community** | Peer-to-peer discussion and support forum |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **AI Providers**: Google Gemini, OpenAI
- **Voice AI**: [VAPI](https://vapi.ai/)
- **Animations**: Framer Motion

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Supabase](https://supabase.com/) project
- A [Google AI Studio](https://aistudio.google.com/) API key (for Gemini)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yashagrawal8329/TNP.git
cd TNP

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your credentials in .env.local

# 4. Set up the database
# Run schema.sql in your Supabase SQL editor

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and populate the values. See [`.env.example`](.env.example) for all required variables.

Key variables:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase public anon key |
| `NEXT_PUBLIC_GOOGLE_AI_API_KEY` | ✅ | Gemini AI API key |
| `OPENAI_API_KEY` | ⬜ | OpenAI key (Gemini used as fallback) |
| `NEXT_PUBLIC_VAPI_API_KEY` | ⬜ | VAPI key for voice mock interviews |

---

## 🗄️ Database

The full schema is defined in [`schema.sql`](schema.sql). Run it in your Supabase project's SQL editor to initialize all tables.

For storage bucket setup, run [`storage_setup.sql`](storage_setup.sql).

See [`docs/DATABASE.md`](docs/DATABASE.md) for a full table-by-table description.

---

## 📁 Project Structure

```
TNP/
├── app/
│   ├── (pages)/          # Next.js App Router page groups
│   ├── api/              # API route handlers
│   ├── components/       # Shared React components
│   ├── contexts/         # React context providers (Auth, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Supabase client & utility libs
│   ├── services/         # Business logic & external API calls
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
├── public/               # Static assets
├── schema.sql            # Full PostgreSQL database schema
├── storage_setup.sql     # Supabase Storage bucket config
└── .env.example          # Environment variable template
```

---

## 🤝 Contributing

Contributions are welcome! Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
