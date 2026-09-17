import React, { useState } from 'react';
import { contactService } from '../services/api';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactService.sendMessage(formData);
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
            Editorial Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Get in Touch with NewsNest
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a news tip, press inquiry, feedback, or editorial correction? Send a message to our newsroom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Editorial Headquarters</h3>

              <div className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">NewsNest Tower</p>
                  <p>750 Media Avenue, Suite 1200, New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <Mail className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Email Desk</p>
                  <p>editor@newsnest.com • press@newsnest.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <Phone className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Phone Support</p>
                  <p>+1 (800) 555-NEWS • +1 (212) 555-0199</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Operating Hours</p>
                  <p>24/7 Global News Desk Operational</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-lg space-y-2">
              <MessageSquare className="w-8 h-8 text-white/90" />
              <h4 className="font-bold text-base">Submit Confidential News Tips</h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Whistleblowers and anonymous sources can send encrypted tips directly to our investigative unit.
              </p>
            </div>
          </div>

          {/* Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you for reaching out to NewsNest. Our editorial desk has received your inquiry and will review it shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-rose-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Send an Inquiry</h3>

                {error && (
                  <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-2xl border border-rose-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="janesmith@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="News Tip / Media Inquiry / Correction"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Message Content *</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Message...' : 'Submit Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
