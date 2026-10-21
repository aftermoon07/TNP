#!/usr/bin/env python3
"""
TNP Placement Portal — ATS Resume Analyzer & Scorer
Author: Aditya Suryawanshi
Description: Standalone CLI utility to parse, extract keywords, and calculate
             ATS match score between resumes and job descriptions using TF-IDF.
"""

import sys
import re
import json
import math
from collections import Counter
from typing import Dict, List, Set, Tuple


STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
    "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
    "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
    "did", "do", "does", "doing", "don't", "down", "during", "each", "few", "for",
    "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers",
    "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn't",
    "it", "its", "itself", "let's", "me", "more", "most", "my", "myself", "no",
    "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
    "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some",
    "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
    "there", "these", "they", "this", "those", "through", "to", "too", "under", "until",
    "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who",
    "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves"
}

TECHNICAL_KEYWORDS = {
    "python", "javascript", "typescript", "react", "nextjs", "nodejs", "express",
    "docker", "kubernetes", "aws", "gcp", "azure", "supabase", "postgresql", "sql",
    "mongodb", "redis", "graphql", "rest", "api", "git", "ci/cd", "tailwind",
    "html", "css", "linux", "c++", "java", "golang", "rust", "machine learning",
    "deep learning", "nlp", "llm", "tensorflow", "pytorch", "pandas", "numpy"
}


def tokenize(text: str) -> List[str]:
    """Tokenize and normalize text into clean words."""
    cleaned = re.sub(r"[^a-zA-Z0-9+#]", " ", text.lower())
    words = cleaned.split()
    return [w for w in words if w not in STOPWORDS and len(w) > 1]


def compute_tf(tokens: List[str]) -> Dict[str, float]:
    """Compute term frequencies for a list of tokens."""
    counts = Counter(tokens)
    total = len(tokens) or 1
    return {word: count / total for word, count in counts.items()}


def cosine_similarity(vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
    """Calculate cosine similarity between two word vectors."""
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([val ** 2 for val in vec1.values()])
    sum2 = sum([val ** 2 for val in vec2.values()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    return float(numerator) / denominator


def analyze_ats(resume_text: str, job_description: str) -> Dict:
    """Perform comprehensive ATS scoring and keyword extraction."""
    resume_tokens = tokenize(resume_text)
    job_tokens = tokenize(job_description)

    tf_resume = compute_tf(resume_tokens)
    tf_job = compute_tf(job_tokens)

    similarity = cosine_similarity(tf_resume, tf_job)
    base_score = round(similarity * 100, 2)

    resume_set = set(resume_tokens)
    job_set = set(job_tokens)

    matched_keywords = sorted(list(job_set & resume_set & TECHNICAL_KEYWORDS))
    missing_keywords = sorted(list((job_set - resume_set) & TECHNICAL_KEYWORDS))

    # Keyword coverage adjustment
    total_tech = len(matched_keywords) + len(missing_keywords)
    keyword_ratio = (len(matched_keywords) / total_tech) if total_tech > 0 else 0.5
    final_score = min(100, round((base_score * 0.4) + (keyword_ratio * 60), 1))

    return {
        "overall_score": final_score,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "stats": {
            "resume_word_count": len(resume_tokens),
            "job_word_count": len(job_tokens),
            "similarity_index": round(similarity, 4),
        },
        "suggestions": [
            f"Add missing keyword: '{kw}' to increase your ATS match" for kw in missing_keywords[:5]
        ]
    }


def main():
    if len(sys.argv) < 3:
        # Default sample run
        sample_resume = (
            "Software engineer skilled in React, Nextjs, TypeScript, PostgreSQL, "
            "Tailwind CSS, Nodejs, and Supabase. Experience building AI web applications."
        )
        sample_jd = (
            "Looking for a Full Stack Developer with expertise in Nextjs, TypeScript, "
            "PostgreSQL, Docker, AWS, and Tailwind CSS. Must have experience with REST APIs."
        )
        print("⚡ Running sample ATS Analysis:")
        result = analyze_ats(sample_resume, sample_jd)
        print(json.dumps(result, indent=2))
        return

    resume_file = sys.argv[1]
    jd_file = sys.argv[2]

    with open(resume_file, "r", encoding="utf-8") as rf:
        resume_content = rf.read()
    with open(jd_file, "r", encoding="utf-8") as jf:
        jd_content = jf.read()

    results = analyze_ats(resume_content, jd_content)
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
