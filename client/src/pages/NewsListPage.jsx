import React, { useEffect, useState } from 'react';
import { useNewsStore } from '../store/newsStore';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

const NewsListPage = () => {
  const {
    newsList,
    categories,
    selectedCategory,
    searchQuery,
    sortBy,
    page,
    totalPages,
    totalItems,
    setCategory,
    setSearchQuery,
    setSortBy,
    setPage,
    fetchNewsList,
    loadingList,
  } = useNewsStore();

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    fetchNewsList();
  }, [selectedCategory, sortBy, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setCategory('All');
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="mb-8">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
            Full Portal Archive
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            All News Articles & Global Coverage
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Browse through total {totalItems} verified headlines, tech breakdowns, and sports events.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search headlines, keywords, or topics..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </form>

            {/* Sort & Reset */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular (Views)</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {(selectedCategory !== 'All' || searchQuery || sortBy !== 'latest') && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Categories Pill Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setCategory}
            />
          </div>
        </div>

        {/* News Grid */}
        {loadingList ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Filter className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No News Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any articles matching your current search query or filter.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-2 text-xs font-bold bg-rose-600 text-white px-4 py-2 rounded-xl"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewsListPage;
