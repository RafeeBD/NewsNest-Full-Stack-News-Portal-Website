import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { newsService } from '../services/api';
import { PlusCircle, Image as ImageIcon, Tag, FileText, Layout, ArrowLeft } from 'lucide-react';

const CreateNewsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'World',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    tags: 'News, Global, Breaking',
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const imagePresets = [
    { label: 'General News', url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Technology', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Business & Finance', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Sports', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Entertainment', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await newsService.createNews(formData);
      setLoading(false);
      navigate(`/news/${result._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to publish news article.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to User Dashboard
        </Link>

        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
              Author Publishing Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Create & Publish News Article
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Publish your breaking story directly to the NewsNest live feed.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Headline Title *
              </label>
              <input
                type="text"
                required
                placeholder="Enter compelling headline..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
              />
            </div>

            {/* Category & Featured toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {['World', 'Technology', 'Business', 'Sports', 'Politics', 'Entertainment', 'Science'].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Featured Article?
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <label htmlFor="isFeatured" className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Feature on Home Hero section
                  </label>
                </div>
              </div>
            </div>

            {/* Excerpt Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Article Summary / Excerpt *
              </label>
              <textarea
                rows="2"
                required
                placeholder="Brief 1-2 sentence overview of the news item..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Image URL & Preset Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 mb-2"
              />
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-slate-400 self-center">Presets:</span>
                {imagePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Body Content */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Article Content *
              </label>
              <textarea
                rows="8"
                required
                placeholder="Write full news coverage content here (separate paragraphs with double line breaks)..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-4 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="Climate, Economy, Global, Technology"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-2xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{loading ? 'Publishing Story...' : 'Publish Article Now'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsPage;
