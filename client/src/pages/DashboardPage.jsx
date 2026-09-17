import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { userService, newsService } from '../services/api';
import {
  User,
  Newspaper,
  Eye,
  ThumbsUp,
  Edit,
  Trash2,
  PlusCircle,
  Settings,
  FileText,
  Save,
  CheckCircle,
  AlertCircle,
  Calendar,
} from 'lucide-react';

const DashboardPage = () => {
  const { user, updateProfile } = useAuthStore();

  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'profile'
  const [myNews, setMyNews] = useState([]);
  const [stats, setStats] = useState({ totalArticles: 0, totalViews: 0, totalLikes: 0 });
  const [loading, setLoading] = useState(true);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    password: '',
  });
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchUserArticles = async () => {
    setLoading(true);
    try {
      const data = await userService.getMyNews();
      setMyNews(data.news || []);
      setStats(data.stats || { totalArticles: 0, totalViews: 0, totalLikes: 0 });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user news:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, []);

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article? This action cannot be undone.')) {
      try {
        await newsService.deleteNews(id);
        fetchUserArticles();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete news article.');
      }
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ type: '', text: '' });

    const res = await updateProfile(profileForm);
    setProfileLoading(false);

    if (res.success) {
      setProfileMsg({ type: 'success', text: 'User profile updated successfully!' });
    } else {
      setProfileMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* User Overview Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-rose-500 shadow-md"
            />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold bg-rose-600 px-2.5 py-0.5 rounded-full">
                {user?.role || 'Member'} Author
              </span>
              <h1 className="text-xl sm:text-2xl font-black">{user?.name}</h1>
              <p className="text-xs text-slate-300 max-w-md line-clamp-1">{user?.bio}</p>
            </div>
          </div>

          <Link
            to="/create-news"
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Article</span>
          </Link>
        </div>

        {/* Dashboard Statistics Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Published Articles</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalArticles}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-sky-100 dark:bg-sky-950/60 text-sky-600 rounded-xl">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Article Views</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalViews}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Reader Engagement</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalLikes || stats.totalArticles * 12}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'articles'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>My Articles ({myNews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Update Profile Information</span>
          </button>
        </div>

        {/* TAB 1: My Articles Management Table/Grid */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500">Loading your articles...</div>
            ) : myNews.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Published Articles Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven't authored any news articles yet. Click below to publish your first headline story!
                </p>
                <Link
                  to="/create-news"
                  className="inline-flex items-center gap-2 bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Article</span>
                </Link>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <th className="p-4">Article Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Views</th>
                        <th className="p-4">Published Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                      {myNews.map((article) => (
                        <tr key={article._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-bold text-slate-900 dark:text-white max-w-md">
                            <Link to={`/news/${article._id}`} className="hover:text-rose-600 line-clamp-1">
                              {article.title}
                            </Link>
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-bold px-2.5 py-1 rounded-lg">
                              {article.category}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-slate-600 dark:text-slate-400">
                            {article.views || 0}
                          </td>
                          <td className="p-4 text-slate-500">
                            {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/edit-news/${article._id}`}
                                className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                title="Edit News"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDeleteArticle(article._id)}
                                className="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                                title="Delete News"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Update Profile Information */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Edit Profile & Account Information</h3>

            {profileMsg.text && (
              <div
                className={`p-3 rounded-2xl text-xs mb-4 flex items-center gap-2 ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200'
                }`}
              >
                {profileMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Bio / Description</label>
                <textarea
                  rows="3"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Avatar Image URL</label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">New Password (Leave blank to keep unchanged)</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={profileForm.password}
                  onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{profileLoading ? 'Updating Profile...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
