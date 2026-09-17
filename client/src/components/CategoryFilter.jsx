import React from 'react';

const CategoryFilter = ({ categories = [], selectedCategory = 'All', onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${
              isSelected
                ? 'bg-rose-600 text-white shadow-rose-500/20 shadow-md scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
