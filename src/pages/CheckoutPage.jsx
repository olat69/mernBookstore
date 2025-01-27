/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../redux/features/orders/ordersApi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaCreditCard, FaPhone, FaUser } from "react-icons/fa"; // Import React Icons

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access totalPrice and cartItems pass from CartPage
  const { totalPrice, cartItems } = location.state || {};
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Redirect if not logged in
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  // Check if the cart is empty or the price is invalid
  if (!totalPrice || !cartItems || cartItems.length === 0) {
    return (
      <div className="text-center mt-8 text-lg text-gray-600">
        There is nothing in your shopping cart. Please return to the Homepage to
        continue shopping.
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // First confirmation alert
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel order",
      confirmButtonColor: "#4CAF50", // Green
      cancelButtonColor: "#F44336", // Red
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed to create the order if confirmed
        const newOrder = {
          name: formData.name,
          email: currentUser?.email,
          address: formData.address,
          phone: formData.phone,
          totalPrice: totalPrice,
          cartItems: cartItems, // Include cart items in the order
        };

        // Call API to create order
        createOrder(newOrder)
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Confirmed Order",
              text: "Your order has been placed successfully!",
              icon: "success",
              confirmButtonText: "Okay",
            });
            navigate("/orders");
          })
          .catch((error) => {
            console.error("Error placing order", error);
            Swal.fire({
              title: "Error",
              text: "Failed to place an order. Please try again.",
              icon: "error",
              confirmButtonText: "Okay",
            });
          });
      } else {
        // If canceled, show a cancellation message
        Swal.fire({
          title: "Order Canceled",
          text: "Your order has been canceled.",
          icon: "info",
          confirmButtonText: "Okay",
        });
      }
    });
  };

  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <motion.div
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

        <motion.div
          className="bg-gray-50 p-6 rounded-md shadow-sm mb-6"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Checkout Summary</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{`#${item.Price}`}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold">{`Qty: ${item.quantity}`}</p>
                <p className="text-lg font-semibold">{`#${(
                  item.Price * item.quantity
                ).toFixed(2)}`}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold text-blue-600">
              #{totalPrice.toFixed(2)}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mb-6 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCreditCard className="text-2xl text-gray-600" />
          <h2 className="text-2xl font-semibold text-center">
            Payment on Delivery
          </h2>
        </motion.div>

        <motion.div
          className="bg-gray-50 p-6 rounded-md shadow-sm mb-6"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2">
              <FaUser className="text-xl text-gray-600" />
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />

            <div className="flex items-center space-x-2">
              <MdEmail className="text-xl text-gray-600" />
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@example.com"
              required
            />

            <div className="flex items-center space-x-2">
              <FaLocationDot className="text-xl text-gray-600" />
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="1234 Street Name"
              required
            />

            <div className="flex items-center space-x-2">
              <FaPhone className="text-xl text-gray-600" />
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
            </div>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="(123) 456-7890"
              required
            />

            <div className="my-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-lg font-semibold rounded-lg py-3 hover:bg-blue-700 transition-all"
              >
                Complete Order
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
