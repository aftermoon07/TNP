import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';
import UserProfile from './auth/UserProfile';
import { useAuth } from '../contexts/AuthContext';
import { useRoleAccess } from '../hooks/useRoleAccess';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
    {children}
  </Link>
);

const MobileNavLink: React.FC<{ href: string; onClick?: () => void; children: React.ReactNode }> = ({ href, onClick, children }) => (
  <Link href={href} onClick={onClick} className="text-left w-full text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
    {children}
  </Link>
);

const DropdownItem: React.FC<{ href: string; onClick?: () => void; children: React.ReactNode; description?: string; icon?: string }> = ({ href, onClick, children, description, icon }) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-start gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg mx-1"
  >
    {icon && <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>}
    <div>
      <div className="font-semibold">{children}</div>
      {description && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</div>}
    </div>
  </Link>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [placementDropdownOpen, setPlacementDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { canAccessAdmin } = useRoleAccess();
  const resumeDropdownRef = useRef<HTMLDivElement>(null);
  const placementDropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  const handleMobileNavClick = () => setIsOpen(false);
  const handleResumeBuilderClick = () => setResumeDropdownOpen(false);
  const handlePlacementPrepClick = () => setPlacementDropdownOpen(false);
  const handleAdminClick = () => setAdminDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resumeDropdownRef.current && !resumeDropdownRef.current.contains(event.target as Node)) setResumeDropdownOpen(false);
      if (placementDropdownRef.current && !placementDropdownRef.current.contains(event.target as Node)) setPlacementDropdownOpen(false);
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target as Node)) setAdminDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-indigo-500/30 transition-shadow">
                <span className="text-white text-lg">💼</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">TNP:RGIT</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            {isAuthenticated && <NavLink href="/dashboard">Dashboard</NavLink>}

            {/* Resume & ATS Dropdown */}
            <div className="relative" ref={resumeDropdownRef}>
              <button
                onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                className={`flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${resumeDropdownOpen ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
              >
                Resume & ATS
                <svg className={`h-4 w-4 transition-transform duration-200 ${resumeDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resumeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-2 animate-slideDown">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Resume Tools</div>
                  <DropdownItem href="/resume-builder" onClick={handleResumeBuilderClick} icon="📄" description="Build professional resumes with AI">Resume Builder</DropdownItem>
                  <DropdownItem href="/ats-tools" onClick={handleResumeBuilderClick} icon="🎯" description="Check ATS compatibility scores">ATS Analyzer</DropdownItem>
                  {isAuthenticated && <DropdownItem href="/my-resumes" onClick={handleResumeBuilderClick} icon="💾" description="View and manage your saved resumes">My Resumes</DropdownItem>}
                </div>
              )}
            </div>

            {/* Placement Prep Dropdown */}
            <div className="relative" ref={placementDropdownRef}>
              <button
                onClick={() => setPlacementDropdownOpen(!placementDropdownOpen)}
                className={`flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${placementDropdownOpen ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
              >
                Placement Prep
                <svg className={`h-4 w-4 transition-transform duration-200 ${placementDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {placementDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-2 animate-slideDown">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Practice Tools</div>
                  <DropdownItem href="/interview" onClick={handlePlacementPrepClick} icon="🤖" description="AI-powered voice & video mock interviews">AI Mock Interview</DropdownItem>
                  <DropdownItem href="/code-playground" onClick={handlePlacementPrepClick} icon="💻" description="Practice coding in multiple languages">Code Playground</DropdownItem>
                  <DropdownItem href="/quiz" onClick={handlePlacementPrepClick} icon="📚" description="Test your tech knowledge with quizzes">Tech Quiz</DropdownItem>
                  <DropdownItem href="/games/roadmap" onClick={handlePlacementPrepClick} icon="🗺️" description="AI-generated career learning roadmaps">AI Roadmap</DropdownItem>
                </div>
              )}
            </div>

            <NavLink href="/games">🎮 Games</NavLink>
            <NavLink href="/alumni">Alumni</NavLink>
            <NavLink href="/drives">Drives</NavLink>

            {/* Admin Dropdown */}
            {canAccessAdmin && (
              <div className="relative" ref={adminDropdownRef}>
                <button
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  className={`flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${adminDropdownOpen ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                >
                  ⚙️ Admin
                  <svg className={`h-4 w-4 transition-transform duration-200 ${adminDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {adminDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-2 animate-slideDown">
                    <DropdownItem href="/admin/users" onClick={handleAdminClick} icon="👥" description="Manage student accounts">User Management</DropdownItem>
                    <DropdownItem href="/quiz/admin" onClick={handleAdminClick} icon="🎯" description="Create and manage quizzes">Quiz Admin</DropdownItem>
                    <DropdownItem href="/admin/analytics" onClick={handleAdminClick} icon="📊" description="View platform analytics">Analytics</DropdownItem>
                  </div>
                )}
              </div>
            )}

            <div className="ml-2 flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggleButton />
              <UserProfile />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center gap-2 md:hidden">
            <ThemeToggleButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              ) : (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-slideDown" id="mobile-menu">
          <div className="px-3 py-4 space-y-1">
            <MobileNavLink href="/" onClick={handleMobileNavClick}>🏠 Home</MobileNavLink>
            {isAuthenticated && <MobileNavLink href="/dashboard" onClick={handleMobileNavClick}>📊 Dashboard</MobileNavLink>}

            <div className="pt-2 pb-1 px-4">
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Resume & ATS</div>
            </div>
            <MobileNavLink href="/resume-builder" onClick={handleMobileNavClick}>📄 Resume Builder</MobileNavLink>
            <MobileNavLink href="/ats-tools" onClick={handleMobileNavClick}>🎯 ATS Tools</MobileNavLink>
            {isAuthenticated && <MobileNavLink href="/my-resumes" onClick={handleMobileNavClick}>💾 My Resumes</MobileNavLink>}

            <div className="pt-2 pb-1 px-4">
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Placement Prep</div>
            </div>
            <MobileNavLink href="/interview" onClick={handleMobileNavClick}>🤖 AI Mock Interview</MobileNavLink>
            <MobileNavLink href="/code-playground" onClick={handleMobileNavClick}>💻 Code Playground</MobileNavLink>
            <MobileNavLink href="/quiz" onClick={handleMobileNavClick}>📚 Tech Quiz</MobileNavLink>
            <MobileNavLink href="/games/roadmap" onClick={handleMobileNavClick}>🗺️ AI Roadmap</MobileNavLink>

            <div className="pt-2 pb-1 px-4">
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Explore</div>
            </div>
            <MobileNavLink href="/games" onClick={handleMobileNavClick}>🎮 Games</MobileNavLink>
            <MobileNavLink href="/alumni" onClick={handleMobileNavClick}>🎓 Alumni Community</MobileNavLink>
            <MobileNavLink href="/drives" onClick={handleMobileNavClick}>🚀 Placement Drives</MobileNavLink>

            {canAccessAdmin && (
              <>
                <div className="pt-2 pb-1 px-4">
                  <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Admin</div>
                </div>
                <MobileNavLink href="/admin/users" onClick={handleMobileNavClick}>👥 User Management</MobileNavLink>
                <MobileNavLink href="/quiz/admin" onClick={handleMobileNavClick}>🎯 Quiz Admin</MobileNavLink>
                <MobileNavLink href="/admin/analytics" onClick={handleMobileNavClick}>📊 Analytics</MobileNavLink>
              </>
            )}

            <div className="pt-3 pb-1 border-t border-slate-200 dark:border-slate-800">
              <UserProfile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;