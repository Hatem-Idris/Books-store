import { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../components/Shop/Filteraside";
import BooksList from "../components/Shop/Products";
import Shopheroimg from "../components/Shop/Shopheroimg";
import { useAuthStore } from "../components/Store/Index";
import Authbox from "../components/Authbox";
const API_BASE_URL = "https://your-api.com/api";

const USE_API = false;

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    publishers: [],
    years: [],
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 10,
    totalItems: 0,
  });

  const fetchBooks = async (page = 1, searchQuery = "") => {
    setLoading(true);

    if (!USE_API) {
      setTimeout(() => {
        setBooks(mockBooks);
        setPagination({
          currentPage: page,
          totalPages: 10,
          totalItems: 100,
        });
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await axios.get(
        `https://bookstore.eraasoft.pro/api/book`,
        {
          params: {
            page,
            limit: 10,
            search: searchQuery,
            categories: filters.categories.join(","),
            publishers: filters.publishers.join(","),
            years: filters.years.join(","),
          },
        },
      );

      setBooks(response.data.books || response.data.data || []);
      setPagination({
        currentPage: response.data.currentPage || page,
        totalPages: response.data.totalPages || 10,
        totalItems: response.data.totalItems || 0,
      });
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks(mockBooks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(pagination.currentPage);
  }, [filters]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    fetchBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query) => {
    fetchBooks(1, query);
  };
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>
      <Shopheroimg />
      {!isAuthenticated && <Authbox />}
      {isAuthenticated && (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-2 md:px-4">
            <div className="flex flex-col md:flex-row gap-6">
              <FilterSidebar filters={filters} setFilters={setFilters} />

              <BooksList
                books={books}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mockBooks = [
  {
    id: 1,
    title: "Rich Dad And Poor Dad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    image:
      "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.2,
    reviewCount: 210,
    author: "Robert T. Kiyosaki",
    year: 1997,
    price: 40.0,
  },
  {
    id: 2,
    title: "Rich Dad And Poor Dad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    image:
      "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.2,
    reviewCount: 210,
    author: "Robert T. Kiyosaki",
    year: 1997,
    price: 40.0,
  },
  {
    id: 3,
    title: "Rich Dad And Poor Dad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    image:
      "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.2,
    reviewCount: 210,
    author: "Robert T. Kiyosaki",
    year: 1997,
    price: 40.0,
  },
];

export default BooksPage;
