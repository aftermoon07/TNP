'use client';
import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const tools = [
  {
    id: 'ai-mock-interview',
    title: 'AI Mock Interview',
    description: 'Practice real-time voice & video interviews powered by AI. Get instant feedback on your answers, tone, and confidence.',
    icon: '🤖',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800/50',
    href: '/interview',
    badge: 'Most Popular',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
  {
    id: 'code-playground',
    title: 'Coding Practice',
    description: 'Solve coding problems in our online IDE supporting Python, JavaScript, Java, C++, and more languages.',
    icon: '💻',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800/50',
    href: '/code-playground',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'quiz',
    title: 'Tech Quiz Challenge',
    description: 'Test your knowledge with interactive quizzes on React, Node.js, DSA, System Design, and more domains.',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800/50',
    href: '/quiz',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'roadmap',
    title: 'AI Career Roadmap',
    description: 'Generate a personalized learning roadmap with AI. Get a step-by-step plan based on your target role and skills.',
    icon: '🗺️',
    color: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800/50',
    href: '/games/roadmap',
    badge: 'New',
    badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  },
  {
    id: 'algorithm-visualizer',
    title: 'Algorithm Visualizer',
    description: 'Visualize sorting, searching, and graph algorithms step-by-step to deepen your understanding of DSA.',
    icon: '📊',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800/50',
    href: '/games/visualizer',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'ats-tools',
    title: 'ATS Resume Checker',
    description: 'Upload your resume and see how well it scores against ATS systems. Get actionable tips to improve your chances.',
    icon: '🎯',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800/50',
    href: '/ats-tools',
    badge: null,
    badgeColor: '',
  },
];

const tips = [
  { icon: '🏢', title: 'Research the Company', desc: 'Understand their mission, values, recent news, and tech stack before the interview.' },
  { icon: '⭐', title: 'Use the STAR Method', desc: 'Structure behavioral answers: Situation, Task, Action, Result — keeps answers clear and impactful.' },
  { icon: '❓', title: 'Prepare Smart Questions', desc: 'Have 3-5 thoughtful questions ready to ask the interviewer about the role and team.' },
  { icon: '🎤', title: 'Practice Out Loud', desc: 'Use our AI Mock Interview to rehearse answers and get comfortable speaking your thoughts clearly.' },
  { icon: '💡', title: 'Tackle DSA Daily', desc: 'Solve at least 1-2 coding problems daily in our Code Playground to build algorithmic thinking.' },
  { icon: '📄', title: 'Optimize Your Resume', desc: 'Run your resume through our ATS checker and tailor it to each job description you apply for.' },
];

export default function InterviewPrepPage() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6 text-sm text-white font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              All tools ready to use
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Interview Preparation Hub
            </h1>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Everything you need to crack your next interview — AI mock interviews, coding practice, quizzes, career roadmaps and more.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Tools</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{tools.length} tools available</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group block h-full">
                <div className={`relative h-full ${tool.bgColor} border ${tool.borderColor} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}>
                  {/* Badge */}
                  {tool.badge && (
                    <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tool.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{tool.description}</p>

                  <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${tool.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                    Start Practicing
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">💡 Pro Interview Tips</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Follow these proven strategies to maximize your interview success rate.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center shadow-2xl shadow-indigo-500/20">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Start Practicing?</h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Jump into an AI mock interview right now and get real-time feedback to boost your confidence.</p>
            <Link
              href="/interview"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transform duration-200"
            >
              🚀 Start AI Interview Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
