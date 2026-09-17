import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, ArrowUpRight } from 'lucide-react';

const NewsCard = ({ news }) => {
  if (!news) return null;

  const categoryColors = {
    World: 'bg-blue-600/90 text-white',
    Technology: 'bg-purple-600/90 text-white',
    Business: 'bg-emerald-600/90 text-white',
    Sports: 'bg-amber-600/90 text-white',
    Politics: 'bg-rose-600/90 text-white',
    Entertainment: 'bg-pink-600/90 text-white',
    Science: 'bg-cyan-600/90 text-white',
  };

  const badgeClass = categoryColors[news.category] || 'bg-slate-700 text-white';

  const dateFormatted = new Date(news.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Article Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={news.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm ${badgeClass}`}>
            {news.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {news.readTime || '3 min read'}
          </span>
          <span>•</span>
          <span>{dateFormatted}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug mb-2">
          <Link to={`/news/${news._id}`}>
            {news.title}
          </Link>
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {news.excerpt}
        </p>

        {/* Footer info: Author & Views */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={news.authorAvatar || news.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={news.authorName || news.author?.name || 'Author'}
              className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
              {news.authorName || news.author?.name || 'NewsNest Staff'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {news.views || 0}
            </span>
            <Link
              to={`/news/${news._id}`}
              className="p-1 text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
