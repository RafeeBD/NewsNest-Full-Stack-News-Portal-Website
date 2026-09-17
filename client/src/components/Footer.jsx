import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Phone, MapPin, Send, Twitter, Facebook, Instagram, Linkedin, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to NewsNest Daily Briefing!');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-gradient-to-tr from-rose-600 to-amber-500 p-2 rounded-xl text-white shadow-md">
                <Newspaper className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                News<span className="text-rose-500">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              NewsNest is a premier global news portal delivering uncompromised journalism, breaking global headlines, technology developments, and in-depth analytical perspectives 24 hours a day.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-xl transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-xl transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-xl transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-rose-600 hover:text-white rounded-xl transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-rose-400 transition-colors">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-rose-400 transition-colors">
                  All News Feed
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-400 transition-colors">
                  Contact Editorial Team
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-rose-400 transition-colors">
                  Contributor Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-rose-400 transition-colors">
                  Create Writer Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Categories</h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/news" className="hover:text-rose-400 transition-colors">
                  World Affairs
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-rose-400 transition-colors">
                  Technology & AI
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-rose-400 transition-colors">
                  Business & Finance
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-rose-400 transition-colors">
                  Sports Highlights
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-rose-400 transition-colors">
                  Politics & Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Daily Briefing</h3>
            <p className="text-xs text-slate-400 mb-3">Get top morning headlines straight to your inbox daily.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs bg-slate-800 text-white rounded-xl border border-slate-700 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs py-2 rounded-xl transition-all shadow-md"
              >
                <span>Subscribe Now</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NewsNest Portal Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Editorial Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
