import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTruck, FiGift, FiEdit3 } from "react-icons/fi";
import { motion } from "motion/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "../components/Store/Index";
import Shopheroimg from "../components/Shop/Shopheroimg";

const BASE_URL = "https://bookstore.eraasoft.pro/api";

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

const initialValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  zip: "",
  address: "",
  payment_method: "cash_on_delivery",
  note: "",
};

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
      (acc, item) => acc + (item.book?.price || 0) * (item.quantity || 1),
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
      console.error(error.response?.data || error);
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
    toast.success("Promo code applied");
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post(
        `${BASE_URL}/order/checkout`,
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
      console.log(error.response?.data || error);
    }
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
      <Shopheroimg />
      <div className="w-full px-4 py-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors }) => (
            <Form>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-7/12 flex flex-col gap-6">
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
                      <div className="flex gap-4">
                        <div className="w-6/12">
                          <label className="text-xs text-gray-400 mb-1 block">
                            Name
                          </label>
                          <Field
                            type="text"
                            name="name"
                            placeholder="John Smith"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                              touched.name && errors.name
                                ? "border-red-400"
                                : "border-gray-200 focus:border-[#D9176C]"
                            }`}
                          />
                          <ErrorMessage
                            name="name"
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                        <div className="w-6/12">
                          <label className="text-xs text-gray-400 mb-1 block">
                            Phone
                          </label>
                          <Field
                            type="text"
                            name="phone"
                            placeholder="123456789"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                              touched.phone && errors.phone
                                ? "border-red-400"
                                : "border-gray-200 focus:border-[#D9176C]"
                            }`}
                          />
                          <ErrorMessage
                            name="phone"
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6/12">
                          <label className="text-xs text-gray-400 mb-1 block">
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            placeholder="johnsmith@gmail.com"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                              touched.email && errors.email
                                ? "border-red-400"
                                : "border-gray-200 focus:border-[#D9176C]"
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                        <div className="w-6/12">
                          <label className="text-xs text-gray-400 mb-1 block">
                            City
                          </label>
                          <Field
                            type="text"
                            name="city"
                            placeholder="Maadi"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                              touched.city && errors.city
                                ? "border-red-400"
                                : "border-gray-200 focus:border-[#D9176C]"
                            }`}
                          />
                          <ErrorMessage
                            name="city"
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6/12">
                          <label className="text-xs text-gray-400 mb-1 block">
                            State
                          </label>
                          <Field
                            type="text"
                            name="state"
                            placeholder="Cairo"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                              touched.state && errors.state
                                ? "border-red-400"
                                : "border-gray-200 focus:border-[#D9176C]"
                            }`}
                          />
                          <ErrorMessage
                            name="state"
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                        <div className="w-6/12">
                          <label className="text-xs text-gray-400 mb-1 block">
                            Zip
                          </label>
                          <Field
                            type="text"
                            name="zip"
                            placeholder="11311"
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                              touched.zip && errors.zip
                                ? "border-red-400"
                                : "border-gray-200 focus:border-[#D9176C]"
                            }`}
                          />
                          <ErrorMessage
                            name="zip"
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Maadi, Cairo, Egypt."
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors bg-gray-50 ${
                            touched.address && errors.address
                              ? "border-red-400"
                              : "border-gray-200 focus:border-[#D9176C]"
                          }`}
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="text-xs text-red-500 mt-1"
                        />
                      </div>
                    </div>
                  </motion.div>

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
                          values.payment_method === "online_payment"
                            ? "border-[#D9176C] text-[#D9176C] bg-pink-50"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Field
                          type="radio"
                          name="payment_method"
                          value="online_payment"
                          className="accent-[#D9176C]"
                        />
                        Online payment
                      </label>
                      <label
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                          values.payment_method === "cash_on_delivery"
                            ? "border-[#D9176C] text-[#D9176C] bg-pink-50"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Field
                          type="radio"
                          name="payment_method"
                          value="cash_on_delivery"
                          className="accent-[#D9176C]"
                        />
                        Cash on delivery
                      </label>
                      <label
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                          values.payment_method === "pos_on_delivery"
                            ? "border-[#D9176C] text-[#D9176C] bg-pink-50"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Field
                          type="radio"
                          name="payment_method"
                          value="pos_on_delivery"
                          className="accent-[#D9176C]"
                        />
                        POS on delivery
                      </label>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                  >
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                      Note
                    </h2>
                    <div className="relative">
                      <FiEdit3
                        className="absolute top-3 left-3 text-gray-400"
                        size={14}
                      />
                      <Field
                        as="textarea"
                        name="note"
                        placeholder="Add note"
                        rows={4}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pl-8 text-sm outline-none resize-none transition-colors focus:border-[#D9176C] bg-gray-50"
                      />
                    </div>
                  </motion.div>
                </div>

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
                            src={item.book?.image}
                            alt={item.book?.title}
                            className="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0"
                          />
                          <div className="flex flex-col justify-between flex-1">
                            <div>
                              <h3 className="font-bold text-gray-800 text-sm">
                                {item.book?.title}
                              </h3>
                              <p className="text-xs text-gray-500">
                                Author:{" "}
                                <span className="text-gray-700">
                                  {item.book?.author}
                                </span>
                              </p>
                              {item.book?.free_shipping && (
                                <span className="flex items-center gap-1 text-xs text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 w-fit mt-1">
                                  <FiTruck
                                    className="text-gray-400"
                                    size={10}
                                  />
                                  Free Shipping
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-base font-semibold text-gray-800">
                                ${item.book?.price}
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
                          {summary.shipping === 0
                            ? "$0"
                            : `$${summary.shipping}`}
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

                    <button
                      type="submit"
                      className="w-full bg-[#D9176C] text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Confirm order
                    </button>
                  </motion.div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
