import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { useEffect, useRef } from "react";

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef();

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 bg-opacity-95 text-white transition-transform duration-300 ease-in-out ${
        isOpen ? "transform-none z-50" : "-translate-x-full"
      }`}
    >
      <button onClick={onClose} className="absolute top-4 right-4">
        <FiX className="text-white text-2xl" />
      </button>

      <ul className="list-none p-4 mt-10 text-white text-2xl">
        <li className="py-2 text-center hover:bg-gray-700 mt-7">
          <a href="/">Home</a>
        </li>
        <li className="py-2 text-center hover:bg-gray-700 mt-7">
          <a href="/cart">Cart</a>
        </li>
        <li className="py-2 text-center hover:bg-gray-700 mt-7">
          <a href="/orders">Orders</a>
        </li>
        <li className="py-2 text-center hover:bg-gray-700 mt-7">
          <a href="/contacts">Contact</a>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Boolean to check if the sidebar is open
  onClose: PropTypes.func.isRequired, // Function to close the sidebar
};

export default Sidebar;
