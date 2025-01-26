/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import image from "../assets/logo1.jpg";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [alertType, setAlertType] = useState(""); // Type of alert (success or error)

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    const { email, password } = inputs;
    setMessage(""); // Clear previous message

    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return false;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please provide a valid email.");
      return false;
    }

    if (password.length < 6) {
      setMessage("Password should be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateForm()) return; // Validate the form before submitting

    setLoading(true); // Start loading state
    setAlertMessage(""); // Clear any previous alert

    try {
      await loginUser(inputs.email, inputs.password);
      setAlertMessage("Login successful!");
      setAlertType("success");
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setAlertMessage("Invalid email or password. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-4xl w-full p-6 lg:p-12 gap-16">
        <img
          src={image}
          alt="logo"
          className="w-full lg:w-1/2 h-auto lg:h-3/4 rounded-lg mb-6 lg:mb-0"
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-2xl items-center font-primary gap-6 w-full lg:w-1/2"
        >
          <h1 className="text-4xl mb-6">Login</h1>

          {/* Email Input */}
          <label className="w-full">
            Create an Email:
            <input
              placeholder="Enter a valid email"
              className="w-full py-2 pl-2 text-xl mt-2 rounded-md"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              aria-label="Email"
              aria-required="true"
            />
          </label>

          {/* Password Input */}
          <label className="w-full mt-4">
            Create Password:
            <input
              placeholder="Enter your password"
              className="w-full py-2 pl-2 text-xl mt-2 rounded-md"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              aria-label="Password"
              aria-required="true"
            />
          </label>

          {/* Error or Success Alert */}
          {alertMessage && (
            <div
              className={`${
                alertType === "success" ? "bg-green-500" : "bg-red-500"
              } text-white text-sm px-4 py-2 rounded-md shadow-md mt-4`}
            >
              <p>{alertMessage}</p>
            </div>
          )}

          {/* Display Validation Message */}
          {message && (
            <div className="text-red-500 text-sm mt-4">
              <p>{message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-4 border-t-4 border-blue-200 border-solid rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1, // Controls the speed of rotation
                  ease: "linear",
                }}
              />
            ) : (
              "Login"
            )}
          </button>

          {/* Redirect to Signup */}
          <a
            href="/signup"
            className="mt-4 text-sm text-blue-500 hover:underline"
          >
            Don't have an account? Sign up here.
          </a>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
