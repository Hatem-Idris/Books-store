import { useState } from 'react';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FilterSidebar = ({ filters, setFilters }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [publisherOpen, setPublisherOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const categories = [
    { name: 'All Categories', count: 1400 },
    { name: 'Business', count: 140 },
    { name: 'Kids', count: 100 },
    { name: 'Art', count: 102 },
    { name: 'History', count: 204 },
    { name: 'Romance', count: 89 },
    { name: 'Fantasy', count: 47 },
    { name: 'Self Help', count: 102 },
    { name: 'Cooking', count: 211 },
    { name: 'Sports', count: 92 },
  ];

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 10);

  const handleCategoryChange = (categoryName) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(categoryName)
        ? prev.categories.filter(c => c !== categoryName)
        : [...prev.categories, categoryName];
      return { ...prev, categories: newCategories };
    });
  };

  return (
    <div className="w-full md:w-3/12 border-r border-r-black/10 p-2">
      <div className="flex items-center gap-2 mb-6 mt-14">
        <FiFilter className="text-gray-700 text-xl" />
        <span className="font-semibold text-gray-800 text-lg">Filter</span>
      </div>

      <div className="mb-6 bg-white p-3 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-gray-700">Categories</span>
          <FiChevronUp className="text-gray-500" />
        </div>

        <div className="space-y-3">
          {displayedCategories.map((category) => (
            <label key={category.name} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{category.name}</span>
              </div>
              <span className="text-xs text-gray-400">({category.count})</span>
            </label>
          ))}
        </div>

        {!showAllCategories && (
          <button
            onClick={() => setShowAllCategories(true)}
            className="text-pink-500 text-sm mt-3 hover:text-pink-600 font-medium"
          >
            Load More
          </button>
        )}
      </div>

      <div className="border-t bg-white p-3 rounded-lg border-gray-100 py-4">
        <button
          onClick={() => setPublisherOpen(!publisherOpen)}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium text-gray-700">Publisher</span>
          {publisherOpen ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {publisherOpen && (
          <div className="mt-3 space-y-2">
            {['Penguin', 'HarperCollins', 'Random House'].map((pub) => (
              <label key={pub} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-600">{pub}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t bg-white p-3 rounded-lg border-gray-100 py-4 mt-6">
        <button
          onClick={() => setYearOpen(!yearOpen)}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium text-gray-700">Year</span>
          {yearOpen ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {yearOpen && (
          <div className="mt-3 space-y-2">
            {['2024', '2023', '2022', '2021', '2020'].map((year) => (
              <label key={year} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-600">{year}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
