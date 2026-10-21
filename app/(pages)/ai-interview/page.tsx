'use client';

import { useState } from 'react';
import VapiInterviewInterface from '../../components/VapiInterviewInterface';
import { FaVideo, FaMicrophone, FaBrain, FaChartLine, FaArrowRight, FaClock, FaCode } from 'react-icons/fa';
import Link from 'next/link';

const features = [
    {
        icon: <FaVideo className="text-2xl text-purple-400" />,
        title: 'Video Interview',
        description: 'Face-to-face interview simulation with your AI interviewer in real-time.',
        bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
        icon: <FaMicrophone className="text-2xl text-pink-400" />,
        title: 'Voice AI',
        description: 'Natural spoken conversation powered by VAPI AI technology.',
        bg: 'bg-pink-500/10 border-pink-500/20',
    },
    {
        icon: <FaBrain className="text-2xl text-blue-400" />,
        title: 'Smart Questions',
        description: 'AI-generated questions tailored to your role, experience & tech stack.',
        bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
        icon: <FaChartLine className="text-2xl text-green-400" />,
        title: 'Live Transcript',
        description: 'Full real-time transcript of the interview conversation as you go.',
        bg: 'bg-green-500/10 border-green-500/20',
    },
];

export default function AIInterviewPage() {
    const [isStarted, setIsStarted] = useState(false);
    const [interviewConfig, setInterviewConfig] = useState({
        role: '',
        experience: 'intermediate',
        techStack: '',
        duration: 15,
    });

    const handleStartInterview = () => {
        if (interviewConfig.role && interviewConfig.techStack) {
            setIsStarted(true);
        }
    };

    if (isStarted) {
        return <VapiInterviewInterface config={interviewConfig} onExit={() => setIsStarted(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 py-12 px-4 relative overflow-hidden">
            {/* Background decorations */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Back link */}
                <Link href="/interview-prep" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Interview Prep
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-purple-300">VAPI AI Powered</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 leading-tight">
                        AI Mock{' '}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                            Interview
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
                        Practice with a real AI interviewer using voice & video. Get a transcript of your entire session and improve your performance.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {features.map((feat, i) => (
                        <div key={i} className={`${feat.bg} border rounded-2xl p-5 backdrop-blur-lg hover:scale-105 transition-transform duration-300`}>
                            <div className="mb-3">{feat.icon}</div>
                            <h3 className="font-bold text-white text-sm mb-1">{feat.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">{feat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Configuration Form */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                            <FaCode className="text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Configure Your Session</h2>
                            <p className="text-gray-400 text-sm">Fill in the details to personalize your interview questions</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Target Role */}
                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-2 text-sm">
                                Target Role <span className="text-purple-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={interviewConfig.role}
                                onChange={(e) => setInterviewConfig({ ...interviewConfig, role: e.target.value })}
                                placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
                                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all"
                            />
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-white font-semibold mb-2 text-sm">Experience Level</label>
                            <select
                                value={interviewConfig.experience}
                                onChange={(e) => setInterviewConfig({ ...interviewConfig, experience: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all appearance-none cursor-pointer"
                            >
                                <option value="entry">Entry Level (0-2 years)</option>
                                <option value="intermediate">Intermediate (2-5 years)</option>
                                <option value="senior">Senior (5+ years)</option>
                            </select>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-white font-semibold mb-2 text-sm flex items-center gap-2">
                                <FaClock className="text-green-400" /> Interview Duration
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[10, 15, 20, 30].map((mins) => (
                                    <button
                                        key={mins}
                                        type="button"
                                        onClick={() => setInterviewConfig({ ...interviewConfig, duration: mins })}
                                        className={`py-3 rounded-xl text-sm font-bold transition-all ${interviewConfig.duration === mins
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 scale-105'
                                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {mins}m
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-2 text-sm">
                                Tech Stack / Skills <span className="text-purple-400">*</span>
                            </label>
                            <textarea
                                value={interviewConfig.techStack}
                                onChange={(e) => setInterviewConfig({ ...interviewConfig, techStack: e.target.value })}
                                placeholder="e.g., React, Node.js, Python, AWS, System Design, TypeScript"
                                rows={3}
                                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                        <button
                            onClick={handleStartInterview}
                            disabled={!interviewConfig.role || !interviewConfig.techStack}
                            className="flex-1 sm:flex-none sm:min-w-[250px] flex items-center justify-center gap-3 py-4 px-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-400 hover:to-pink-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <FaMicrophone />
                            Start Interview
                            <FaArrowRight className="text-sm" />
                        </button>
                        <p className="text-xs text-gray-500 text-center sm:text-left">
                            Requires microphone & camera permission. Make sure devices are connected.
                        </p>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span>💡</span> Quick Tips for Best Results
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            'Use a stable internet connection for smooth voice calls',
                            'Allow microphone & camera access when prompted by browser',
                            'Find a quiet environment with good lighting',
                            'Speak clearly and take time to think before answering',
                        ].map((tip, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                                {tip}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
