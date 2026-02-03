import { useParams } from "react-router-dom";

import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Uncomment in your Vite project
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaRegHeart, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMinus, FiPlus, FiShare2 } from 'react-icons/fi';
import Shopheroimg from "../components/Shop/Shopheroimg";
import { LiaShippingFastSolid } from "react-icons/lia";

import { CiCircleCheck } from "react-icons/ci";

import Flashsalecards from "../components/Home/Flashsalecards";

// API Base URL - Change this to your actual API
const API_BASE_URL = 'https://your-api.com/api';

// Set to true when you have a real API
const USE_API = false;

// Star Rating Component
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

// Product Gallery Component
const ProductGallery = ({ images, selectedImage, setSelectedImage }) => {
  return (
    <div className="flex flex-col gap-4 md:items-center">
      {/* Main Image */}
      <div className="w-full h-full max-w-xs">
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt="Product"
          className="w-full h-90 object-contain rounded-lg"
        />
      </div>
      {/* Thumbnail Images */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? 'border-pink-500' : 'border-gray-200'
            }`}
          >
            <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo = ({ product, quantity, setQuantity, onAddToCart }) => {
  return (
    <div className="flex-1">
      {/* Title and Social Share */}
      <div className="flex flex-col md:flex-row items-start justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
        <div className="flex items-center gap-2">
          <a href="#" className="text-blue-600 hover:text-blue-700"><FaFacebook size={18} /></a>
          <a href="#" className="text-pink-500 hover:text-pink-600"><FaInstagram size={18} /></a>
          <a href="#" className="text-gray-800 hover:text-gray-900"><FaXTwitter size={18} /></a>
          <a href="#" className="text-green-500 hover:text-green-600"><FaWhatsapp size={18} /></a>
          <button className="text-gray-500 hover:text-gray-600"><FiShare2 size={18} /></button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-3 leading-relaxed">{product.description}</p>

      {/* Book Meta Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mt-4 text-sm">
        <div>
          <span className="text-gray-400">Author</span>
          <p className="text-gray-700 font-medium">{product.author}</p>
        </div>
        <div>
          <span className="text-gray-400">Publication Year</span>
          <p className="text-gray-700 font-medium">{product.publicationYear}</p>
        </div>
        <div>
          <span className="text-gray-400">Book</span>
          <p className="text-gray-700 font-medium">{product.bookNumber}</p>
        </div>
        <div>
          <span className="text-gray-400">Pages</span>
          <p className="text-gray-700 font-medium">{product.pages}</p>
        </div>
        <div>
          <span className="text-gray-400">Language</span>
          <p className="text-gray-700 font-medium">{product.language}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-4">
        <StarRating rating={product.rating} />
        <span className="text-gray-400 text-sm">({product.reviewCount} Reviews)</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        Rate: <span className="font-medium text-gray-700">{product.rating}</span>
      </div>
      <div className="flex flex-col lg:items-end w-full">
      {/* Tags */}
      <div className="flex items-center gap-2 mt-4">
        <span className="flex items-center gap-1 bg-white border border-green-500 text-green-500 text-xs px-3 py-1 rounded"><CiCircleCheck className="w-4 h-4 bg-[#25D994] text-white rounded-full" />In Stock</span>
        <span className="flex items-center gap-1 bg-white border border-gray-300 text-gray-500 text-xs px-3 py-1 rounded"><LiaShippingFastSolid className="w-4 h-4 text-black" /> Free Shipping Today</span>
      </div>

      {/* Discount Code */}
      <div className="mt-2">
        <span className="bg-white text-[#EAA451] border border-black/20 text-xs px-3 py-1 rounded">
          Discount code: Md212
        </span>
      </div>
      </div>

      {/* Price */}

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>
      <div className="w-full flex flex-col md:flex-row items-center lg:justify-end gap-4 mt-6">
        {/* Quantity Selector */}
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-6 h-6 flex items-center justify-center border border-[#D9176C] rounded-full text-[#D9176C]"
          >
            <FiMinus className="cursor-pointer" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-6 h-6 flex items-center justify-center border border-[#D9176C] rounded-full text-[#D9176C]"
          >
            <FiPlus className="cursor-pointer " />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-2">
        <button
          onClick={onAddToCart}
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          <span>Add To Cart</span>
          <FaShoppingCart />
        </button>

        {/* Wishlist Button */}
        <button className="w-14 h-11 flex items-center justify-center border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
          <FaRegHeart />
        </button>
        </div>
      </div>
    </div>
  );
};

// Product Tabs Component
const ProductTabs = ({ product, activeTab, setActiveTab }) => {
  const tabs = ['Product Details', 'Customer Reviews', 'Recomended For You'];

  return (
    <div className="mt-10">
      {/* Tab Headers */}
      <div className="flex items-center gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-gray-800 border-b-2 border-pink-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'Product Details' && (
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Book Title :</span>
              <span className="text-gray-600">{product.title}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Author :</span>
              <span className="text-gray-600">{product.author}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Publication Date :</span>
              <span className="text-gray-600">{product.publicationYear}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">ASIN :</span>
              <span className="text-gray-600">{product.asin}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Language :</span>
              <span className="text-gray-600">{product.language}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Publisher :</span>
              <span className="text-gray-600">{product.publisher}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Pages :</span>
              <span className="text-gray-600">{product.pages}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Book Format :</span>
              <span className="text-gray-600">{product.format}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-800 w-40">Best Seller Rank :</span>
              <span className="text-gray-600">#{product.bestSellerRank}</span>
            </div>
          </div>
        )}

        {activeTab === 'Customer Reviews' && (
          <div className="text-gray-500">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}

        {activeTab === 'Recomended For You' && (
          <div className="text-gray-500">
            <Flashsalecards/>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Product Details Page Component
// Props: id - book ID (pass from your router, e.g., <ProductDetailsPage id={params.id} />)
const ProductDetailsPage = () => {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Product Details');

  // Fetch Product from API
  const fetchProduct = async () => {
    setLoading(true);
    
    // Use mock data if API is not available
    if (!USE_API) {
      setTimeout(() => {
        setProduct(mockProduct);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`${API_BASE_URL}/books/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Mock data for development
      setProduct(mockProduct);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { product, quantity });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div>
    <Shopheroimg/>
    <div className="min-h-screen bg-[#F5F5F5]">

      {/* Main Content */}
      <div className="container bg-[#F5F5F5] mx-auto px-4 py-8">
        <div className="p-4">
          {/* Product Section */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Gallery */}
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            {/* Product Info */}
            <ProductInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* Product Tabs */}
          <ProductTabs
            product={product}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

// Mock data for development - Remove when connecting to real API
const mockProduct = {
  id: 1,
  title: 'Rich Dad And Poor Dad',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Aliquam in justo varius, sagittis neque ut, malesuada leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo. Aliquam in justo varius, sagittis neque ut, malesuada leo.',
  images: [
    'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg',
  ],
  author: 'Robert T. Kiyosaki',
  publicationYear: 1997,
  bookNumber: '1 Of 1',
  pages: 336,
  language: 'English',
  rating: 4.2,
  reviewCount: 210,
  price: 40.00,
  originalPrice: 40.00,
  asin: 'B09TWSRMCB',
  publisher: 'Printer',
  format: 'Hard Cover',
  bestSellerRank: 3,
  inStock: true,
};

export default ProductDetailsPage;
