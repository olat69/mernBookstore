import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, logoutUser } = useAuth();

  const handleLogOut = () => {
    logoutUser();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-5 md:px-14 py-6">
      <nav className="flex justify-between">
        <div className="flex items-center gap-4 md:gap-16">
          <AiOutlineBars
            onClick={toggleSidebar}
            className="size-7 md:size-6 "
          />
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div>
            <IoSearchOutline className="size-5 absolute inline-block inset-y-8" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-slate-200 w-3/4 md:w-full py-1 md:px-8 px-6 focus:outline-none rounded-sm font-primary "
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 md:gap-5">
          <div>
            {currentUser ? (
              // Show logout button with hover tooltip
              <button
                onClick={handleLogOut}
                className="py-2"
                title="Logout" // This will show a tooltip on hover
              >
                <FaUser className="size-5" />
              </button>
            ) : (
              // Show login link if user is logged out
              <Link to="/login">
                <FaRegUser className="size-5" />
              </Link>
            )}
          </div>

          <button>
            <FaRegHeart className="size-5" />
          </button>
          <Link
            to="/cart"
            className="bg-primary flex items-center justify-center py-2 px-4 rounded-md text-white"
          >
            <MdOutlineShoppingCart className="text-xl" />
            {cartItems.length > 0 && (
              <span className="text-sm font-semibold ml-2">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
