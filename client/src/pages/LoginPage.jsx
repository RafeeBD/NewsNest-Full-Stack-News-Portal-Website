import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Newspaper, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const res = await login({ email, password });
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 flex items-center justify-center px-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-gradient-to-tr from-rose-600 to-amber-500 p-2 rounded-xl text-white shadow-md">
              <Newspaper className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              News<span className="text-rose-600">Nest</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">Welcome Back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to your account to publish news articles and join reader discussions.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@newsnest.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Login Credentials Quick Helper */}
        <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-2xl text-[11px] text-slate-600 dark:text-slate-400 space-y-1 border border-slate-200 dark:border-slate-700/50">
          <p className="font-bold text-slate-800 dark:text-slate-200">Demo Login Credentials:</p>
          <p>Email: <code className="text-rose-600 dark:text-rose-400">user@newsnest.com</code></p>
          <p>Password: <code className="text-rose-600 dark:text-rose-400">password123</code></p>
        </div>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          <span>Don't have a NewsNest account? </span>
          <Link to="/register" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
