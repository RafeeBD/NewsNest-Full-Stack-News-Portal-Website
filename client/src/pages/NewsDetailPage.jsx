import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewsStore } from '../store/newsStore';
import CommentSection from '../components/CommentSection';
import NewsCard from '../components/NewsCard';
import { Clock, Eye, Calendar, User, Tag, Share2, ArrowLeft, ThumbsUp } from 'lucide-react';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { currentNews, newsList, fetchNewsById, loadingSingle, error } = useNewsStore();

  useEffect(() => {
    if (id) {
      fetchNewsById(id);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loadingSingle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse w-3/4" />
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
        <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error || !currentNews) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Article Not Found</h2>
        <p className="text-xs text-slate-500">The news article you are looking for does not exist or has been removed.</p>
        <Link to="/news" className="inline-block bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
          Back to News Feed
        </Link>
      </div>
    );
  }

  const relatedNews = newsList.filter((n) => n._id !== currentNews._id && n.category === currentNews.category).slice(0, 3);

  const dateFormatted = new Date(currentNews.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News Feed
        </Link>

        {/* Category & Title Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
              {currentNews.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentNews.readTime || '3 min read'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {currentNews.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic border-l-4 border-rose-500 pl-4 py-1">
            {currentNews.excerpt}
          </p>

          {/* Author metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={currentNews.authorAvatar || currentNews.author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
                alt={currentNews.authorName || currentNews.author?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-rose-500/30"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {currentNews.authorName || currentNews.author?.name || 'NewsNest Staff'}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> {dateFormatted}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                <Eye className="w-4 h-4 text-rose-500" /> {currentNews.views || 1} Views
              </span>
              <button
                onClick={() => alert('Article link copied to clipboard!')}
                className="flex items-center gap-1 font-medium bg-slate-200/60 dark:bg-slate-800 hover:bg-rose-500 hover:text-white px-3 py-1.5 rounded-xl transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/9] mb-10 bg-slate-900">
          <img
            src={currentNews.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
            alt={currentNews.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Article Body Text */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
          {currentNews.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-8">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {currentNews.tags && currentNews.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" /> Topic Tags:
            </span>
            {currentNews.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div className="mt-10 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
          <img
            src={currentNews.authorAvatar || currentNews.author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
            alt="Author"
            className="w-16 h-16 rounded-full object-cover border-2 border-rose-500"
          />
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Written by {currentNews.authorName || currentNews.author?.name || 'NewsNest Staff'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentNews.author?.bio || 'Verified correspondent and editorial contributor at NewsNest portal.'}
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <CommentSection newsId={currentNews._id} />

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related Stories in {currentNews.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetailPage;
