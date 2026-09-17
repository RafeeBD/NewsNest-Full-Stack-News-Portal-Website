import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNewsStore } from '../store/newsStore';
import { MessageSquare, Send, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommentSection = ({ newsId }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { comments, addComment } = useNewsStore();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    const res = await addComment(newsId, content);
    setSubmitting(false);

    if (res.success) {
      setContent('');
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-rose-600 dark:text-rose-500" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Reader Discussion ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
          <div className="flex gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts or analysis on this headline..."
                className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:outline-none dark:text-white"
                required
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 mb-8 text-center text-xs text-rose-800 dark:text-rose-300">
          <span>Please </span>
          <Link to="/login" className="font-bold underline">
            Sign In
          </Link>
          <span> or </span>
          <Link to="/register" className="font-bold underline">
            Register an Account
          </Link>
          <span> to join the conversation and post a comment.</span>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">Be the first to comment on this article.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex gap-3">
              <img
                src={comment.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={comment.userName}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{comment.userName}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
