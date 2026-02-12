import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTruck } from "react-icons/fi";
import { FaRegTrashAlt, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import { useAuthStore } from "../components/Store/Index";
import Shopheroimg from "../components/Shop/Shopheroimg";

const BASE_URL = "https://bookstore.eraasoft.pro/api";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore((state) => state.token);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      setWishlistItems(data.wishlist_items || data || []);
    } catch (error) {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchWishlist();
  }, [token]);

  const removeItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/wishlist/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWishlist();
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const moveToCart = async () => {
    try {
      await axios.post(
        `${BASE_URL}/wishlist/move-to-cart`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Items moved to cart");
      fetchWishlist();
    } catch (error) {
      toast.error("Failed to move items to cart");
    }
  };

  const totalItems = wishlistItems.length;
  const totalPrice = wishlistItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
    0,
  );

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: wishlistItems,
        summary: {
          subtotal: totalPrice,
          shipping: 0,
          tax: 0,
          total: totalPrice,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#D9176C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Shopheroimg/>
    <div className="w-full px-4 py-6 h-dvh">
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="flex items-center bg-gray-50 border-b border-gray-200 py-4 px-6">
          <div className="w-3/12 md:w-5/12">
            <span className="text-sm font-semibold text-gray-700">Item</span>
          </div>
          <div className="w-3/12 md:w-2/12 text-center">
            <span className="text-sm font-semibold text-gray-700">
              Quantity
            </span>
          </div>
          <div className="w-3/12 md:w-2/12 text-center">
            <span className="text-sm font-semibold text-gray-700">Price</span>
          </div>
          <div className="w-3/12 md:w-2/12 text-center">
            <span className="text-sm font-semibold text-gray-700">
              Total Price
            </span>
          </div>
        </div>

        <AnimatePresence>
          {wishlistItems.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Your wishlist is empty
            </div>
          ) : (
            wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center py-6 px-6 ${
                  index !== wishlistItems.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="w-5/12 flex gap-4">
                  <img
                    src={item.product?.image}
                    alt={item.product?.title}
                    className="w-28 h-36 object-cover rounded shadow-md flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="font-bold text-gray-800 text-sm">
                      {item.product?.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Author:{" "}
                      <span className="text-gray-700">
                        {item.product?.author}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {item.product?.description}
                    </p>
                    {item.product?.free_shipping && (
                      <span className="flex items-center gap-1 text-xs text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 w-fit mt-1">
                        <FiTruck className="text-gray-400" size={12} />
                        Free Shipping
                      </span>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      ASIN : {item.product?.asin}
                    </p>
                  </div>
                </div>

                <div className="w-2/12 flex items-center justify-center gap-2">
                  <span className="text-[#D9176C]">
                    <FiMinus size={18} />
                  </span>
                  <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
                    {item.quantity || 1}
                  </span>
                  <span className="text-[#D9176C]">
                    <FiPlus size={18} />
                  </span>
                </div>

                <div className="w-2/12 text-center">
                  <span className="text-lg font-semibold text-gray-800">
                    ${item.product?.price}
                  </span>
                </div>

                <div className="w-2/12 text-center">
                  <span className="text-lg font-semibold text-gray-800">
                    ${(item.product?.price || 0) * (item.quantity || 1)}
                  </span>
                </div>

                <div className="w-1/12 flex justify-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#D9176C] hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <FaRegTrashAlt size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {wishlistItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <button
            onClick={moveToCart}
            className="bg-[#D9176C] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Move to cart
          </button>
          <button
            onClick={handleCheckout}
            className="flex items-center gap-3 bg-gray-800 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <span className="bg-[#D9176C] text-white text-xs px-2 py-1 rounded">
              {totalItems} items
              <br />${totalPrice}
            </span>
            <span>Check out</span>
            <FaShoppingCart size={16} />
          </button>
        </motion.div>
      )}
    </div>
    </div>
  );
}
