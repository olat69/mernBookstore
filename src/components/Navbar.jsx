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
    <header className="max-w-screen-2xl mx-auto px-14 py-6">
      <nav className="flex justify-between">
        <div className="flex items-center gap-4 md:gap-16">
          <AiOutlineBars onClick={toggleSidebar} className="size-6" />
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div>
            <IoSearchOutline className="size-5 absolute inline-block inset-y-8" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-slate-200 w-full py-1 md:px-8 px-6 focus:outline-none font-primary"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 md:gap-5">
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

          <button className="hidden sm:block">
            <FaRegHeart className="size-5" />
          </button>
          <Link
            to="/cart"
            className="bg-primary flex items-center justify-evenly w-full py-1 md:px-5 px-4"
          >
            <MdOutlineShoppingCart />
            {cartItems.length > 0 && (
              <span className="text-sm font-semibold sm:ml-1">
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
