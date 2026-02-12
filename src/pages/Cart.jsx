import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTruck, FiGift } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import { useAuthStore } from "../components/Store/Index";
import Shopheroimg from "../components/Shop/Shopheroimg";

const BASE_URL = "https://bookstore.eraasoft.pro/api";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  const token = useAuthStore((state) => state.token);
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/cart`, { headers });
      const data = res.data.data;
      setCartItems(data.cart_items || []);
      setSummary({
        subtotal: data.sub_total || 0,
        shipping: data.shipping || 0,
        tax: data.tax || 0,
        total: data.total || 0,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, [token]);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.post(
        `${BASE_URL}/cart/update/${id}`,
        { quantity },
        { headers },
      );
      fetchCart();
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cart/destroy/${id}`, { headers });
      fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, summary } });
  };

  const handleKeepShopping = () => {
    navigate("/");
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    // TODO: Call promo code API endpoint
    toast.success("Promo code applied");
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
        {/* Table Header */}
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

        {/* Cart Items */}
        <AnimatePresence>
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center py-6 px-6 ${
                  index !== cartItems.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Item Info */}
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

                {/* Quantity */}
                <div className="w-2/12 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) - 1)
                    }
                    className="text-[#D9176C] hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <FiMinus size={18} />
                  </button>
                  <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    className="text-[#D9176C] hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>

                {/* Price */}
                <div className="w-2/12 text-center">
                  <span className="text-lg font-semibold text-gray-800">
                    ${item.product?.price}
                  </span>
                </div>

                {/* Total Price */}
                <div className="w-2/12 text-center">
                  <span className="text-lg font-semibold text-gray-800">
                    ${(item.product?.price || 0) * (item.quantity || 1)}
                  </span>
                </div>

                {/* Delete */}
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

      {/* Payment Summary */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-8"
        >
          <div className="flex gap-8">
            {/* Left - Summary Info */}
            <div className="w-6/12">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Payment Summary
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                et ultrices est. Aliquam in justo varius, sagittis neque ut,
                malesuada leo.
              </p>

              <p className="text-sm text-gray-500 mb-2">
                Have a discount code?
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-1">
                  <span className="px-3 text-gray-400">
                    <FiGift size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="py-2 px-1 text-sm outline-none flex-1 bg-transparent"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-gray-800 text-white text-sm px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Right - Price Breakdown */}
            <div className="w-6/12 flex flex-col justify-center pl-8">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-semibold text-gray-700">
                  ${summary.subtotal}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Shipping</span>
                <span className="text-sm font-semibold text-gray-700">
                  {summary.shipping === 0
                    ? "Free Delivery"
                    : `$${summary.shipping}`}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Tax</span>
                <span className="text-sm font-semibold text-gray-700">
                  ${summary.tax}
                </span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  Total
                </span>
                <span className="text-xl font-bold text-[#D9176C]">
                  ${summary.total}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleCheckout}
              className="w-full bg-[#D9176C] text-white py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Check out
            </button>
            <button
              onClick={handleKeepShopping}
              className="w-full border-2 border-[#D9176C] text-[#D9176C] py-3 rounded-full text-sm font-semibold hover:bg-[#D9176C] hover:text-white transition-colors cursor-pointer"
            >
              Keep Shopping
            </button>
          </div>
        </motion.div>
      )}
    </div>
    </div>
  );
}
