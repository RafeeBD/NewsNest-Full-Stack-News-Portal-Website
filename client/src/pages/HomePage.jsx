import React, { useEffect } from 'react';
import { useNewsStore } from '../store/newsStore';
import NewsTicker from '../components/NewsTicker';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import NewsCard from '../components/NewsCard';
import { Flame, TrendingUp, Sparkles, Send, Award, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const {
    topNews,
    newsList,
    categories,
    selectedCategory,
    setCategory,
    fetchTopNews,
    fetchNewsList,
    loadingTop,
    loadingList,
  } = useNewsStore();

  useEffect(() => {
    fetchTopNews();
    fetchNewsList();
  }, []);

  const featuredList = newsList.slice(0, 6);
  const trendingList = newsList.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      {/* SECTION 1: Breaking News Ticker Header */}
      <NewsTicker items={topNews} />

      {/* SECTION 2: Top 6 News Hero Grid (API call) */}
      <HeroSection topNews={topNews} loading={loadingTop} />

      {/* SECTION 3: Category Spotlight Filter & Live Feed */}
      <section className="py-10 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                Category Spotlight
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Explore Latest Stories by Topic
              </h2>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setCategory}
            />
          </div>

          {/* News Card Grid */}
          {loadingList ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : featuredList.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm">No articles found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredList.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 hover:bg-rose-600 dark:hover:bg-rose-600 text-white text-xs font-bold px-6 py-3 rounded-2xl transition-all shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All News Catalog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Editor's Choice & Most Popular Column */}
      <section className="py-12 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Editor's Picks */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Award className="w-5 h-5 text-rose-600" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Editor's Picks & Deep Dives</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {newsList.slice(2, 6).map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Most Read Trending Sidebar */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 h-fit space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Most Read Right Now</h3>
              </div>

              <div className="space-y-4">
                {trendingList.map((item, idx) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="group flex gap-3 items-start pb-3 border-b border-slate-200/60 dark:border-slate-800/60 last:border-0 last:pb-0"
                  >
                    <span className="text-2xl font-black text-rose-500/40 group-hover:text-rose-600 transition-colors w-6">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">{item.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 mt-1 block">{item.views || 450} readers</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-500 text-white space-y-2">
                  <ShieldCheck className="w-6 h-6 text-white/90" />
                  <h4 className="font-bold text-sm">Become a NewsNest Contributor</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Registered members can publish their own news stories and analysis directly to NewsNest.
                  </p>
                  <Link
                    to="/create-news"
                    className="inline-block text-xs font-bold bg-white text-rose-600 px-3 py-1.5 rounded-xl shadow mt-1 hover:bg-rose-50 transition-colors"
                  >
                    Start Publishing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Newsletter & Community Pulse Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl border border-rose-500/20">
            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
                <Sparkles className="w-3.5 h-3.5" /> NewsNest Insider
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Get Unbiased Global News Delivered Daily
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join over 250,000 readers who rely on NewsNest for breaking headlines, economic trends, tech innovations, and independent editorial analysis.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to NewsNest!');
                }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="px-4 py-3 text-xs sm:text-sm bg-white/10 text-white placeholder-slate-400 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-rose-500 flex-1 backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe Now</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
