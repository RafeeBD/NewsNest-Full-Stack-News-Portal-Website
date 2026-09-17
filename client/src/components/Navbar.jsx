import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useNewsStore } from '../store/newsStore';
import WeatherWidget from './WeatherWidget';
import {
  Newspaper,
  Sun,
  Moon,
  Search,
  PlusCircle,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { setSearchQuery } = useNewsStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      navigate('/news');
      setSearchInput('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All News', path: '/news' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const categories = ['World', 'Technology', 'Business', 'Sports', 'Politics', 'Entertainment', 'Science'];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Utility Bar */}
      <div className="bg-slate-100 dark:bg-slate-950 py-1.5 px-4 text-xs border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <WeatherWidget />
          <div className="flex items-center gap-3 ml-auto text-slate-600 dark:text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Live 24/7 Coverage
            </span>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="text-[11px]">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-tr from-rose-600 to-amber-500 p-2 rounded-xl text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
              News<span className="text-rose-600 dark:text-rose-500">Nest</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
              Truth • Speed • Depth
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 relative ${
                location.pathname === link.path
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-600 dark:bg-rose-400 rounded-full" />
              )}
            </Link>
          ))}

          {/* Category Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 py-1 transition-colors">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    useNewsStore.getState().setCategory(cat);
                    navigate('/news');
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative max-w-xs flex-1">
          <input
            type="text"
            placeholder="Search news headlines..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 rounded-full border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
        </form>

        {/* Actions & User Account */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/create-news"
                className="hidden sm:inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm transition-all hover:shadow-rose-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Article</span>
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:ring-2 hover:ring-rose-500/30 transition-all"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt={user?.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block mr-1" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-500" />
                      <span>User Dashboard</span>
                    </Link>
                    <Link
                      to="/create-news"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors sm:hidden"
                    >
                      <PlusCircle className="w-4 h-4 text-rose-500" />
                      <span>Publish Article</span>
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-2 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all hover:shadow-rose-500/20"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search news headlines..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          <div className="flex flex-col space-y-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    useNewsStore.getState().setCategory(cat);
                    setMobileMenuOpen(false);
                    navigate('/news');
                  }}
                  className="text-left px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
