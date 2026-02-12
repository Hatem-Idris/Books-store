import { useState } from "react";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
const AppLink  = ({ to, children, className, ...props }) => {
  return (
    <RouterLink to={to} className={className} {...props}>
      {children}
    </RouterLink>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex flex-1">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
          w-full
          bg-white
          text-black
          px-5 py-3
          rounded-l-full
        "
          />
          <TiMicrophoneOutline className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
        <button
          className="
        bg-white
        text-[#D9176C]
        px-5
        flex items-center justify-center
        rounded-r-full
        cursor-pointer
        border-l border-l-black/10
        hover:bg-[#D9176C] hover:text-white transition
      "
        >
          <IoSearch className="w-5 h-12" />
        </button>
      </div>
    </form>
  );
};

const CategoryTags = ({ selectedTag, setSelectedTag }) => {
  const tags = [
    "Business",
    "Self Help",
    "History",
    "Romance",
    "Fantasy",
    "Art",
    "Kids",
    "Music",
    "Cooking",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border border-black/20 ${
            selectedTag === tag
              ? "bg-[#D9176C80] text-white"
              : " text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
  }
  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />,
    );
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />,
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
      <div className="relative flex-shrink-0">
        <AppLink  to={`/Shop/${book.id}`}>
          <img
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            className="w-full max-h-60 object-contain"
          />
        </AppLink>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col ">
          <div className="flex flex-col lg:flex-row justify-between">
            <AppLink  to={`/Shop/${book.id}`}>
              <h3 className="font-semibold text-gray-800 text-xl lg:text-lg mb-2.5 lg:mb-0 hover:text-pink-500 transition-colors">
                {book.title}
              </h3>
            </AppLink>
            <span className="bg-white border border-[#EBC305] text-[#EBC305] text-xs text-center px-3 py-2 rounded">
              25% Discount code: Md212
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-3 line-clamp-3 w-full lg:w-8/12">
            {book.description}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={book.rating} />
            <span className="text-gray-400 text-xs">
              ({book.reviewCount} Reviews)
            </span>
          </div>

          <div className="text-sm text-gray-500 mt-1">
            Rate:{" "}
            <span className="font-medium text-gray-700">{book.rating}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 mt-2 text-sm">
          <div className="flex justify-between md:items-end">
          <div className="flex flex-col lg:mr-7">
            <span className="text-gray-400 font-bold">Author</span>
            <p className="text-gray-700 font-medium text-[12px] lg:text-[15px]">
              {book.author}
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 font-bold">Year</span>
            <p className="text-gray-700 font-medium">{book.year}</p>
          </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl text-start md:text-end mt-3 mb-3 md:mb-1 font-bold text-gray-800">
              ${book.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center w-full justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 px-1 md:p-2 lg:px-4 lg:py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                <span className="text-[11px] md:text-sm">Add To Cart</span>
                <FaShoppingCart />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors">
                <FaRegHeart />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end"></div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= Math.min(totalPages, 3); i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 text-[#D9176C] hover:text-pink-600 cursor-pointer text-sm"
        >
          <FiChevronLeft />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1 mx-4">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-[#D9176C] text-white"
                  : "bg-white text-[#D9176C] hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          {totalPages > 3 && (
            <span className="w-8 h-8 px-2.5 bg-white rounded-lg text-[#D9176C]">
              ...
            </span>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 text-[#D9176C] hover:text-pink-600 cursor-pointer text-sm"
        >
          <span>Next</span>
          <FiChevronRight />
        </button>
      </div>
      <p className="text-gray-400 text-sm">1-20 of 5000+ Book available</p>
    </div>
  );
};

const BooksList = ({ books, loading, pagination, onPageChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("Business");
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4 mt-14">
        <div className="flex-1 w-full">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={onSearch}
          />
        </div>
        <div className="flex items-center gap-2 text-black">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option hidden>Sort by</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <CategoryTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

      <div className="space-y-4 mt-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No books found</div>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>

      {books.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default BooksList;
