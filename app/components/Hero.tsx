'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = [
    { icon: '🤖', label: 'AI Mock Interviews' },
    { icon: '📄', label: 'Smart Resume Builder' },
    { icon: '🎯', label: 'ATS Optimizer' },
    { icon: '💻', label: 'Code Playground' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-indigo-400 dark:text-indigo-300">AI-Powered Career Platform — Now Live</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
          Land Your Dream Job{' '}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Faster with AI
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none">
              <path d="M0 4 Q75 0 150 4 Q225 8 300 4" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          From building ATS-optimized resumes to AI-powered mock interviews — everything you need to ace your placement, all in one platform.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
          {features.map((feat, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <span>{feat.icon}</span> {feat.label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/interview"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            <span>🎯</span>
            Start AI Mock Interview
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/resume-builder"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold py-4 px-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            <span>📄</span>
            Build My Resume
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 mt-14">
          {[
            { value: '10K+', label: 'Students Placed' },
            { value: '500+', label: 'Companies' },
            { value: '95%', label: 'Success Rate' },
            { value: '24/7', label: 'AI Support' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl px-6 py-4 min-w-[100px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;