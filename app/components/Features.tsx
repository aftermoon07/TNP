import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  gradient: string;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, href, gradient, badge }) => (
  <Link href={href} className="group block h-full">
    <div className="relative h-full bg-white dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-transparent dark:hover:border-transparent hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />

      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">
          {badge}
        </span>
      )}

      {/* Icon */}
      <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>

      {/* Arrow */}
      <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
        Explore →
      </div>
    </div>
  </Link>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <IconResume />,
      title: 'Resume Builder',
      description: 'AI-powered resume builder with ATS optimization and multiple professional templates.',
      href: '/resume-builder',
      gradient: 'from-indigo-500 to-blue-600',
      badge: 'Popular',
    },
    {
      icon: <IconATS />,
      title: 'ATS Score Checker',
      description: 'Optimize your resume for Applicant Tracking Systems and check real compatibility scores.',
      href: '/ats-tools',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <IconInterview />,
      title: 'AI Mock Interview',
      description: 'AI-powered mock interviews with live voice & video feedback to boost your confidence.',
      href: '/interview',
      gradient: 'from-purple-500 to-pink-500',
      badge: 'New',
    },
    {
      icon: <IconCode />,
      title: 'Code Playground',
      description: 'Practice coding problems in an online IDE supporting multiple programming languages.',
      href: '/code-playground',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <IconGames />,
      title: 'Learning Games',
      description: 'Algorithm visualizers, aptitude quizzes, and AI roadmap generators to sharpen your skills.',
      href: '/games',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: <IconPlacement />,
      title: 'Placement Drives',
      description: 'Browse and apply to company-specific placement drives and job opportunities.',
      href: '/drives',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <IconMentor />,
      title: 'Alumni Community',
      description: 'Ask doubts and get answers directly from alumni via our community platform.',
      href: '/alumni',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: <IconRoadmap />,
      title: 'AI Roadmap',
      description: 'Generate personalized career roadmaps with AI to plan your learning path effectively.',
      href: '/games/roadmap',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      icon: <IconQuiz />,
      title: 'Tech Quiz',
      description: 'Challenge yourself with interactive technical quizzes across React, Python, and more.',
      href: '/quiz',
      gradient: 'from-violet-500 to-purple-600',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-4 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800">
            Everything You Need
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Complete Career{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            A comprehensive AI-powered platform built to fulfill every student's placement and career needs.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// SVG Icons
const IconResume = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconATS = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const IconPlacement = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconCode = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const IconGames = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>;
const IconInterview = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const IconMentor = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconRoadmap = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>;
const IconQuiz = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default Features;