# Contributing to TNP Placement Portal

Thank you for taking the time to contribute! 🎉  
This guide explains how to set up the project locally and submit your changes.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)

---

## Prerequisites

- **Node.js** ≥ 18 and **npm** ≥ 9
- A **Supabase** account and project
- A **Google AI Studio** API key (for Gemini)
- **Git** installed and configured

---

## Local Development Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/TNP.git
cd TNP

# 2. Add the upstream remote
git remote add upstream https://github.com/aftermoon07/TNP.git

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase URL, anon key, and API keys

# 5. Initialize the database
# → Go to your Supabase project → SQL Editor → paste contents of schema.sql

# 6. Run the dev server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Branch Naming Convention

Create branches from `main` using this format:

| Type | Branch prefix | Example |
|---|---|---|
| New feature | `feat/` | `feat/add-job-filters` |
| Bug fix | `fix/` | `fix/ats-score-null-crash` |
| Documentation | `docs/` | `docs/update-setup-guide` |
| Refactoring | `refactor/` | `refactor/auth-context` |
| Style/UI | `style/` | `style/dark-mode-improvements` |

```bash
git checkout -b feat/my-feature
```

---

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(<scope>): <short description>

[optional body]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**
```
feat(resume): add PDF export with custom color schemes
fix(auth): resolve session null pointer on first load
docs(readme): add environment variable table
```

---

## Pull Request Process

1. **Keep your fork up to date:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch and open a PR** against `main`:
   ```bash
   git push origin feat/my-feature
   ```

3. **Fill in the PR template** — describe what changed and why.

4. **Checklist before requesting review:**
   - [ ] `npm run build` passes without errors
   - [ ] `npm run lint` shows no new warnings
   - [ ] New environment variables are documented in `.env.example`
   - [ ] UI changes are tested in both light and dark mode (if applicable)

5. A maintainer will review your PR and may request changes.

---

## Code Style

- **TypeScript** — prefer explicit types over `any`
- **Components** — use functional components with hooks; no class components
- **Imports** — use absolute imports via `@/` alias (configured in `tsconfig.json`)
- **Formatting** — ESLint is configured; run `npm run lint` before committing
- **CSS** — Tailwind utility classes; avoid inline styles

---

## Reporting Issues

Use [GitHub Issues](https://github.com/aftermoon07/TNP/issues) to report bugs or request features.

When filing a bug report, please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS version
- Any relevant console errors or screenshots
