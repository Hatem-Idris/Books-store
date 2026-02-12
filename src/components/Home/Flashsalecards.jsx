import { useState, useEffect } from "react";
import richdadimg from "../../assets/Homepageimgs/93e9747c9160601f7f3a7a57420103fe4025b18a.png";
const books = [
  {
    id: 1,
    title: "Rich Dad And Poor Dad",
    author: "Robert T. Kiyosaki",
    rating: 4.2,
    reviews: 180,
    originalPrice: 45.0,
    currentPrice: 30.0,
    booksLeft: 4,
    image: richdadimg,
  },
  {
    id: 2,
    title: "Rich Dad And Poor Dad",
    author: "Robert T. Kiyosaki",
    rating: 4.2,
    reviews: 180,
    originalPrice: 45.0,
    currentPrice: 30.0,
    booksLeft: 4,
    image: richdadimg,
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    rating: 4.5,
    reviews: 250,
    originalPrice: 40.0,
    currentPrice: 25.0,
    booksLeft: 7,
    image:
      "https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    reviews: 320,
    originalPrice: 50.0,
    currentPrice: 35.0,
    booksLeft: 2,
    image:
      "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 5,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    rating: 4.3,
    reviews: 200,
    originalPrice: 35.0,
    currentPrice: 20.0,
    booksLeft: 5,
    image:
      "https://m.media-amazon.com/images/I/71UypkUjStL._AC_UF1000,1000_QL80_.jpg",
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < fullStars ? "text-yellow-400" : "text-gray-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const BookCard = ({ book }) => {
  const stockPercentage = (book.booksLeft / 10) * 100;

  return (
    <div className="bg-[#3B2F4A] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 h-full">
      <div className="flex-shrink-0 flex justify-center sm:items-center md:items-stretch">
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="w-28 h-40 md:w-30 md:h-full lg:w-40 lg:h-60 rounded-lg shadow-lg object-contain "
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-white font-semibold text-base sm:text-lg leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Author: <span className="text-gray-300">{book.author}</span>
          </p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <StarRating rating={book.rating} />
            <span className="text-white/50">({book.reviews} Review)</span>
          </div>

          <p className="text-gray-400 text-sm mt-1">
            Rate: <span className="text-white font-medium">{book.rating}</span>
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-500 text-sm">
              ${book.originalPrice.toFixed(2)}
            </span>
            <span className="text-white font-bold text-xl">
              ${book.currentPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">
            {book.booksLeft} books left
          </p>
        </div>

        <button className="self-end mt-2 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl transition-colors cursor-pointer">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const BooksCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(2);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Calculate max index based on items per view
  const maxIndex = Math.max(0, books.length - itemsPerView);

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  const nextSlide = () => {
    if (!isAtEnd) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!isAtStart) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Calculate transform percentage based on items per view
  const slideWidth = 100 / itemsPerView;

  return (
    <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="relative flex items-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={isAtStart}
            className={`flex-shrink-0 shadow-lg rounded-full p-3 transition-colors z-10 cursor-pointer ${
              isAtStart
                ? "bg-gray-200 cursor-not-allowed opacity-50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="flex-1 mx-4 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}%)`,
              }}
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex-shrink-0 px-1 md:px-2"
                  style={{ width: `${slideWidth}%` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={isAtEnd}
            className={`flex-shrink-0 shadow-lg rounded-full p-3 transition-colors z-10 cursor-pointer ${
              isAtEnd
                ? "bg-gray-200 cursor-not-allowed opacity-50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksCarousel;
