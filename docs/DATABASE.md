# 🗄️ Database Documentation

This document describes the PostgreSQL schema used by the TNP Placement Portal, managed through [Supabase](https://supabase.com/).

> The full DDL is in [`schema.sql`](../schema.sql). Run it in your Supabase SQL Editor to initialize the database.

---

## Table Overview

| Table | Purpose |
|---|---|
| `users` | Core user accounts (students, mentors, recruiters) |
| `resumes` | Student resume data (JSON + file path) |
| `ats_results` | ATS keyword analysis results per resume |
| `ats_analysis_history` | Historical ATS scoring records |
| `recruiter_jobs` | Job postings by recruiters |
| `applications` | Student applications to job postings |
| `quizzes` | Quiz definitions |
| `questions` | Individual MCQ questions |
| `quiz_questions` | Many-to-many join between quizzes and questions |
| `quiz_assignments` | Quiz assignments to specific users |
| `attempts` | User quiz attempts |
| `attempt_answers` | Per-question answers for each attempt |
| `leaderboard` | Quiz scores for competitive ranking |
| `mock_interviews` | Scheduled mock interview sessions |
| `placement_prep` | Per-topic placement preparation progress |
| `time_planner` | User task/schedule entries |
| `ai_mentor_logs` | AI mentor query and response logs |
| `code_ide` | Saved code IDE projects |

---

## Table Details

### `users`
Core user table. All other tables reference this via `user_id`.

| Column | Type | Notes |
|---|---|---|
| `user_id` | integer (PK) | Auto-increment |
| `name` | varchar | User full name |
| `email` | varchar | Unique |
| `role` | enum | `student`, `mentor`, `recruiter` (user_role) |
| `password_hash` | varchar | Hashed password |
| `user_uid` | varchar | Supabase Auth UID |

---

### `resumes`
Stores resume data in both JSON format and as a file path.

| Column | Type | Notes |
|---|---|---|
| `resume_id` | integer (PK) | |
| `user_id` | integer (FK → users) | |
| `resume_name` | varchar | Display name |
| `resume_file_path` | text | Supabase Storage path |
| `resume_data` | jsonb | Structured resume content |
| `ats_score` | numeric | Last calculated ATS score |
| `template_id` | integer | Selected resume template |
| `color_scheme` | jsonb | Color customization |
| `resume_tsv` | tsvector | Full-text search index |

---

### `recruiter_jobs`
Job postings created by recruiters.

| Column | Type | Notes |
|---|---|---|
| `job_id` | integer (PK) | |
| `recruiter_id` | integer (FK → users) | |
| `title` | varchar | Job title |
| `description` | text | Full job description |
| `requirements` | text | Skill/experience requirements |
| `location` | varchar | Work location |
| `salary_range` | varchar | e.g., `"12-18 LPA"` |
| `job_type` | varchar | e.g., `"full-time"`, `"internship"` |
| `is_active` | boolean | Whether the listing is live |
| `expires_at` | timestamptz | Auto-expire date |
| `job_tsv` | tsvector | Full-text search index |

---

### `applications`
Students apply to jobs. Tracks application status.

| Column | Type | Notes |
|---|---|---|
| `app_id` | integer (PK) | |
| `job_id` | integer (FK → recruiter_jobs) | |
| `student_id` | integer (FK → users) | |
| `resume_id` | integer (FK → resumes) | Resume used to apply |
| `status` | enum | `pending`, `reviewed`, `accepted`, `rejected` |
| `cover_letter` | text | Optional cover letter |

---

### `quizzes`, `questions`, `attempts`

```
quizzes ──< quiz_questions >── questions
   │                               │
   └──< quiz_assignments           │
   │                               │
   └──< attempts ──< attempt_answers (FK → questions)
   │
   └──< leaderboard
```

- **`quizzes`**: Titled quiz collections with time limits and passing scores.
- **`questions`**: Reusable MCQ bank with `choices[]` array and `correct_answer`.
- **`attempts`**: One record per user quiz attempt, with aggregate `score`.
- **`attempt_answers`**: Per-question correctness records for each attempt.
- **`leaderboard`**: Top scores per quiz for competitive display.

---

### `mock_interviews`
Scheduled AI/mentor mock interview sessions.

| Column | Type | Notes |
|---|---|---|
| `interview_id` | integer (PK) | |
| `student_id` | integer (FK → users) | |
| `mentor_id` | integer (FK → users) | Optional human mentor |
| `scheduled_date` | timestamptz | Planned interview time |
| `feedback` | text | Post-interview feedback |
| `rating` | numeric (0–5) | Session rating |

---

### `time_planner`
Task scheduling for students.

| Column | Type | Notes |
|---|---|---|
| `planner_id` | integer (PK) | |
| `user_id` | integer (FK → users) | |
| `task_name` | varchar | |
| `start_time` / `end_time` | timestamptz | |
| `category` | enum | `study`, `interview`, `other` (task_category) |
| `status` | enum | `pending`, `in_progress`, `completed` (task_status) |

---

### `ai_mentor_logs`
Stores every AI mentor query and response for auditing and personalization.

| Column | Type | Notes |
|---|---|---|
| `log_id` | integer (PK) | |
| `user_id` | integer (FK → users) | |
| `query` | text | User's question |
| `ai_response` | text | AI generated answer |
| `context_type` | varchar | e.g., `"resume"`, `"roadmap"` |
| `metadata` | jsonb | Provider info, token counts, etc. |

---

## Full-Text Search

Two tables use `tsvector` columns for PostgreSQL full-text search:
- **`resumes.resume_tsv`** — enables searching through resume content
- **`recruiter_jobs.job_tsv`** — enables keyword search across job listings

These should be kept updated via database triggers or application-level updates on insert/update.

---

## Storage

Resume file uploads are stored in **Supabase Storage**. Run [`storage_setup.sql`](../storage_setup.sql) to create the required buckets and access policies.
