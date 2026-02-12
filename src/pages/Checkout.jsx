import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTruck, FiGift, FiEdit3 } from "react-icons/fi";
import { motion } from "motion/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "../components/Store/Index";
import Shopheroimg from "../components/Shop/Shopheroimg";

const BASE_URL = "https://bookstore.eraasoft.pro/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const [orderItems, setOrderItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (location.state?.cartItems && location.state?.summary) {
      setOrderItems(location.state.cartItems);
      setSummary(location.state.summary);
      setLoading(false);
    } else {
      fetchCartForCheckout();
    }
  }, [token, location.state, navigate]);

  const fetchCartForCheckout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;
      setOrderItems(data.cart_items || []);
      setSummary({
        subtotal: data.sub_total || 0,
        tax: data.tax || 0,
        shipping: data.shipping || 0,
        total: data.total || 0,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to load order data");
      }
    } finally {
      setLoading(false);
    }
  };

  const recalculateSummary = (items) => {
    const subtotal = items.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 1),
      0,
    );
    const tax = summary.tax;
    const shipping = summary.shipping;
    setSummary({
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
    });
  };
  const updateQuantityOnServer = async (itemId, newQuantity) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/cart/${itemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error(error);
      return null;
    }
  };
  const updateItemQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = await updateQuantityOnServer(itemId, newQuantity);
    if (updatedCart) {
      setOrderItems(updatedCart.cart_items || orderItems);
      recalculateSummary(updatedCart.cart_items || orderItems);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    // TODO: Call promo code API endpoint
    toast.success("Promo code applied");
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip code is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      zip: "",
      address: "",
      paymentMethod: "cash_on_delivery",
      note: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${BASE_URL}/checkout`,
          {
            ...values,
            items: orderItems,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Order confirmed successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Failed to confirm order");
      }
    },
  });

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
    <div className="w-full px-4 py-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Forms */}
          <div className="w-full md:w-7/12 flex flex-col gap-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-5">
                Shipping information
              </h2>

              <div className="flex flex-col gap-4">
                {/* Name & Phone */}
                <div className="flex gap-4">
                  <div className="w-6/12">
                    <label className="text-xs text-gray-400 mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="John Smith"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#D9176C]"
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-6/12">
                    <label className="text-xs text-gray-400 mb-1 block">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="123456789"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                        formik.touched.phone && formik.errors.phone
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#D9176C]"
                      }`}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & City */}
                <div className="flex gap-4">
                  <div className="w-6/12">
                    <label className="text-xs text-gray-400 mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="johnsmith@gmail.com"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#D9176C]"
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-6/12">
                    <label className="text-xs text-gray-400 mb-1 block">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Maadi"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                        formik.touched.city && formik.errors.city
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#D9176C]"
                      }`}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* State & Zip */}
                <div className="flex gap-4">
                  <div className="w-6/12">
                    <label className="text-xs text-gray-400 mb-1 block">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Cairo"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                        formik.touched.state && formik.errors.state
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#D9176C]"
                      }`}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.state}
                      </p>
                    )}
                  </div>
                  <div className="w-6/12">
                    <label className="text-xs text-gray-400 mb-1 block">
                      Zip
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formik.values.zip}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="11311"
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                        formik.touched.zip && formik.errors.zip
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#D9176C]"
                      }`}
                    />
                    {formik.touched.zip && formik.errors.zip && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.zip}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Maadi, Cairo, Egypt."
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                      formik.touched.address && formik.errors.address
                        ? "border-red-400"
                        : "border-gray-200 focus:border-[#D9176C]"
                    }`}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.address}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="flex flex-col md:flex-row gap-3">
                <label
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                    formik.values.paymentMethod === "online_payment"
                      ? "border-[#D9176C] text-[#D9176C] bg-pink-50"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online_payment"
                    checked={formik.values.paymentMethod === "online_payment"}
                    onChange={formik.handleChange}
                    className="accent-[#D9176C]"
                  />
                  Online payment
                </label>
                <label
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                    formik.values.paymentMethod === "cash_on_delivery"
                      ? "border-[#D9176C] text-[#D9176C] bg-pink-50"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formik.values.paymentMethod === "cash_on_delivery"}
                    onChange={formik.handleChange}
                    className="accent-[#D9176C]"
                  />
                  Cash on delivery
                </label>
                <label
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                    formik.values.paymentMethod === "pos_on_delivery"
                      ? "border-[#D9176C] text-[#D9176C] bg-pink-50"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pos_on_delivery"
                    checked={formik.values.paymentMethod === "pos_on_delivery"}
                    onChange={formik.handleChange}
                    className="accent-[#D9176C]"
                  />
                  POS on delivery
                </label>
              </div>
            </motion.div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">Note</h2>
              <div className="relative">
                <FiEdit3
                  className="absolute top-3 left-3 text-gray-400"
                  size={14}
                />
                <textarea
                  name="note"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  placeholder="Add note"
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pl-8 text-sm outline-none resize-none transition-colors focus:border-[#D9176C] bg-gray-50"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full md:w-5/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 sticky top-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-5">
                Order summary
              </h2>

              {/* Order Items */}
              <div className="flex flex-col gap-5 mb-6">
                {orderItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex gap-3 pb-5 ${
                      index !== orderItems.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">
                          {item.product?.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Author:{" "}
                          <span className="text-gray-700">
                            {item.product?.author}
                          </span>
                        </p>
                        {item.product?.free_shipping && (
                          <span className="flex items-center gap-1 text-xs text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 w-fit mt-1">
                            <FiTruck className="text-gray-400" size={10} />
                            Free Shipping
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-semibold text-gray-800">
                          ${item.product?.price}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) - 1,
                              )
                            }
                            className="text-[#D9176C] hover:opacity-70 transition-opacity cursor-pointer"
                          >
                            <FiMinus size={16} />
                          </button>
                          <span className="text-sm font-medium text-gray-700 min-w-[16px] text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) + 1,
                              )
                            }
                            className="text-[#D9176C] hover:opacity-70 transition-opacity cursor-pointer"
                          >
                            <FiPlus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-5">
                <p className="text-xs text-gray-400 mb-2">
                  Have a discount code?
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-1">
                    <span className="px-2.5 text-gray-400">
                      <FiGift size={14} />
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
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-gray-800 text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-700">
                    ${summary.subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Tax</span>
                  <span className="text-sm font-semibold text-gray-700">
                    ${summary.tax}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Shipping</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {summary.shipping === 0 ? "$0" : `$${summary.shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 mt-1 pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Total (USD)
                  </span>
                  <span className="text-xl font-bold text-[#D9176C]">
                    ${summary.total}
                  </span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full bg-[#D9176C] text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Confirm order
              </button>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
