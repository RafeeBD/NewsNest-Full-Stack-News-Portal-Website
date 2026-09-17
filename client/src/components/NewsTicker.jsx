import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsTicker = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 text-xs py-2 px-4 overflow-hidden flex items-center shadow-inner">
      <div className="flex items-center gap-2 bg-rose-600 font-bold px-2.5 py-1 rounded text-[10px] tracking-wider uppercase shrink-0 shadow-sm animate-pulse">
        <Flame className="w-3.5 h-3.5" />
        <span>Breaking</span>
      </div>

      <div className="overflow-hidden whitespace-nowrap relative flex-1 ml-3">
        <div className="animate-ticker space-x-8">
          {items.map((item, idx) => (
            <Link
              key={item._id || idx}
              to={`/news/${item._id}`}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            >
              <span className="font-semibold text-rose-400">[{item.category}]</span>
              <span className="group-hover:underline">{item.title}</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-rose-400 transition-colors" />
            </Link>
          ))}
          {/* Duplicate set for seamless looping */}
          {items.map((item, idx) => (
            <Link
              key={`dup-${item._id || idx}`}
              to={`/news/${item._id}`}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            >
              <span className="font-semibold text-rose-400">[{item.category}]</span>
              <span className="group-hover:underline">{item.title}</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-rose-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
