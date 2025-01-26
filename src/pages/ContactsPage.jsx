import { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import Swal from "sweetalert2";

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send form data to the server or handle the logic
    // For now, we'll show a success message using SweetAlert
    Swal.fire({
      title: "Thank you for reaching out!",
      text: "We have received your message and will get back to you soon.",
      icon: "success",
      confirmButtonText: "Okay",
    });

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-6 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Have questions? We're here to help! Reach out to us and we'll get back
          to you as soon as possible.
        </p>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
          <div className="flex items-center space-x-4">
            <FiPhone className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FiMail className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">help@delightbookstore.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg text-gray-800 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg text-gray-800 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg text-gray-800 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactsPage;
