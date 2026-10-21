#!/usr/bin/env python3
"""
TNP Placement Portal — Supabase Database Seeder & Mock Data Generator
Author: Aditya Suryawanshi
Description: Seeds sample mock interview questions, placement jobs, and quiz sets
             directly into Supabase or outputs as formatted SQL.
"""

import os
import json
import random
from typing import List, Dict

MOCK_JOBS = [
    {
        "title": "Full Stack Software Engineer",
        "description": "Develop and maintain modern web applications with Next.js, TypeScript, and Supabase.",
        "requirements": "Proficiency in React/Next.js, SQL, TypeScript, and REST APIs.",
        "location": "Bengaluru, India (Hybrid)",
        "salary_range": "12 - 18 LPA",
        "job_type": "Full-time",
    },
    {
        "title": "AI / ML Engineer (Intern)",
        "description": "Work with LLMs, Gemini API, and retrieval pipelines for educational technology.",
        "requirements": "Strong Python skills, experience with Gemini or OpenAI APIs, prompt engineering.",
        "location": "Mumbai, India (Remote)",
        "salary_range": "40,000 / month",
        "job_type": "Internship",
    },
    {
        "title": "Backend Systems Engineer",
        "description": "Design high-performance microservices, PostgreSQL query optimization, and caching.",
        "requirements": "Experience with Node.js, Go or Python, Redis, PostgreSQL, and Docker.",
        "location": "Pune, India (On-site)",
        "salary_range": "14 - 22 LPA",
        "job_type": "Full-time",
    },
]

INTERVIEW_QUESTIONS = [
    {
        "topic": "System Design",
        "question": "How would you design a rate limiter for an API with millions of daily requests?",
        "difficulty": "Medium",
        "expected_points": ["Token bucket algorithm", "Redis for distributed counters", "Sliding window log"]
    },
    {
        "topic": "Frontend Optimization",
        "question": "Explain Core Web Vitals (LCP, FID/INP, CLS) and how you optimize them in Next.js.",
        "difficulty": "Hard",
        "expected_points": ["Image optimization next/image", "Dynamic imports / code splitting", "Font preloading"]
    },
    {
        "topic": "Database & SQL",
        "question": "What is the difference between clustered and non-clustered indexing in PostgreSQL?",
        "difficulty": "Medium",
        "expected_points": ["B-tree structure", "Physical storage order vs logical pointer", "Index maintenance cost"]
    }
]


def generate_sql_insert() -> str:
    """Generate SQL statements for mock interview and jobs insertion."""
    sql_lines = ["-- Generated Seed Data by Aditya Suryawanshi", "BEGIN;"]

    for job in MOCK_JOBS:
        sql = (
            f"INSERT INTO public.recruiter_jobs (recruiter_id, title, description, requirements, location, salary_range, job_type) "
            f"VALUES (1, '{job['title']}', '{job['description']}', '{job['requirements']}', '{job['location']}', '{job['salary_range']}', '{job['job_type']}');"
        )
        sql_lines.append(sql)

    for q in INTERVIEW_QUESTIONS:
        sql = (
            f"INSERT INTO public.questions (category, difficulty, question, choices, correct_answer) "
            f"VALUES ('{q['topic']}', '{q['difficulty']}', '{q['question']}', '{{\"A\", \"B\", \"C\", \"D\"}}', 'A');"
        )
        sql_lines.append(sql)

    sql_lines.append("COMMIT;")
    return "\n".join(sql_lines)


def main():
    print("=" * 60)
    print("TNP Placement Portal — Database Seed Generator")
    print("Author: Aditya Suryawanshi")
    print("=" * 60)
    sql_output = generate_sql_insert()
    print(sql_output)


if __name__ == "__main__":
    main()
