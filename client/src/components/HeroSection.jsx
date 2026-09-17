import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

const HeroSection = ({ topNews = [], loading = false }) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!topNews || topNews.length === 0) return null;

  const mainStory = topNews[0];
  const sideStories = topNews.slice(1, 6);

  return (
    <section className="py-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-600 text-white rounded-xl shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Top Headlines & Breaking Stories
            </h2>
          </div>
          <Link
            to="/news"
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>Explore All News</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top 6 News Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured Main Story (Left 7 Cols) */}
          {mainStory && (
            <div className="lg:col-span-7 group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-[16/11] flex flex-col justify-end">
              <img
                src={mainStory.image}
                alt={mainStory.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              <div className="relative p-6 sm:p-8 z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Top Feature • {mainStory.category}
                  </span>
                  <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {mainStory.readTime || '4 min read'}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight group-hover:text-rose-400 transition-colors">
                  <Link to={`/news/${mainStory._id}`}>{mainStory.title}</Link>
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {mainStory.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <img
                      src={mainStory.authorAvatar || mainStory.author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
                      alt="Author"
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-white font-medium">{mainStory.authorName || mainStory.author?.name || 'Lead Reporter'}</span>
                  </div>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-rose-400" /> {mainStory.views || 1200} Views
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 5 Side Stories Grid (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {sideStories.map((story, index) => (
              <div
                key={story._id || index}
                className="group p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-rose-500/50 dark:hover:border-rose-500/50 shadow-sm hover:shadow-md transition-all duration-200 flex gap-3 items-center"
              >
                <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    #{index + 2}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-bold text-rose-600 dark:text-rose-400 uppercase">{story.category}</span>
                    <span>•</span>
                    <span>{story.readTime || '3 min'}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/news/${story._id}`}>{story.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
