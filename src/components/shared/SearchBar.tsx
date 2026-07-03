'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, filters: Record<string, any>) => void;
  filters?: {
    id: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  initialQuery?: string;
  initialFilters?: Record<string, any>;
  className?: string;
  variant?: 'default' | 'expanded' | 'minimal';
  autoFocus?: boolean;
  debounceMs?: number;
}

export function SearchBar({
  placeholder = 'Cari...',
  onSearch,
  filters = [],
  initialQuery = '',
  initialFilters = {},
  className,
  variant = 'default',
  autoFocus = false,
  debounceMs = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(query, activeFilters);
    }, debounceMs);
    return () => clearTimeout(timeoutRef.current);
  }, [query, activeFilters, debounceMs, onSearch]);

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({});
    setIsFilterOpen(false);
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  if (variant === 'minimal') {
    return (
      <div className={cn('relative', className)}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            'w-full px-4 py-2 pr-10 rounded-lg border border-gray-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200'
          )}
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    );
  }

  if (variant === 'expanded') {
    return (
      <div className={cn('', className)}>
        <div className={cn(
          'flex items-center gap-2 p-2 rounded-xl border-2 border-gray-200',
          'focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500',
          'transition-all duration-200',
          isExpanded ? 'bg-white' : 'bg-gray-50'
        )}>
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder-gray-400"
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
          />
          {filters.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  hasActiveFilters
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-100'
                )}
              >
                Filter
                {hasActiveFilters && (
                  <span className="ml-1 text-xs bg-blue-600 text-white rounded-full px-1.5 py-0.5">
                    {Object.keys(activeFilters).length}
                  </span>
                )}
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                  {filters.map((filter) => (
                    <div key={filter.id} className="mb-3 last:mb-0">
                      <label className="text-xs font-medium text-gray-500 block mb-1">
                        {filter.label}
                      </label>
                      <select
                        value={activeFilters[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Semua</option>
                        {filter.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSearch(query, activeFilters)}
          >
            Cari
          </Button>
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              const filter = filters.find(f => f.id === key);
              const option = filter?.options.find(o => o.value === value);
              return (
                <Badge
                  key={key}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {filter?.label}: {option?.label || value}
                  <button
                    onClick={() => setActiveFilters(prev => {
                      const newFilters = { ...prev };
                      delete newFilters[key];
                      return newFilters;
                    })}
                    className="ml-1 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            'w-full px-4 py-2.5 pl-10 pr-24 rounded-xl border border-gray-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200 text-sm text-gray-700 placeholder-gray-400'
          )}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {filters.length > 0 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                'px-2 py-1 text-xs rounded-lg transition-colors',
                hasActiveFilters
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              Filter
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onSearch(query, activeFilters)}
              className="text-xs px-3 py-1 h-8"
            >
              Cari
            </Button>
          </div>
        )}
      </div>
      {isFilterOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
          {filters.map((filter) => (
            <div key={filter.id} className="mb-3 last:mb-0">
              <label className="text-xs font-medium text-gray-500 block mb-1">
                {filter.label}
              </label>
              <select
                value={activeFilters[filter.id] || ''}
                onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.id === key);
            const option = filter?.options.find(o => o.value === value);
            return (
              <Badge
                key={key}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                {filter?.label}: {option?.label || value}
                <button
                  onClick={() => setActiveFilters(prev => {
                    const newFilters = { ...prev };
                    delete newFilters[key];
                    return newFilters;
                  })}
                  className="ml-1 hover:text-gray-700"
                >
                  ✕
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
