import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 flex items-center justify-center px-4 transition-colors">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <Newspaper className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The page or news story you requested could not be located. It may have been moved or archived.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-rose-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow hover:bg-rose-700 transition-colors"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
