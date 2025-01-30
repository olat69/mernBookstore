import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useFetchAllBooksQuery } from "../redux/features/book/booksApi";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, logoutUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const { data: books } = useFetchAllBooksQuery();

  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for managing dropdown visibility
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false); // State for managing search dropdown visibility
  const dropdownRef = useRef(null); // Reference for the user dropdown
  const searchDropdownRef = useRef(null); // Reference for the search dropdown

  const handleLogOut = () => {
    logoutUser();
    setDropdownOpen(false); // Close the user dropdown after logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredBooks);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = () => {
    setSearchQuery(""); // Clear search input
    setSearchResults([]); // Close the dropdown by clearing results
    setSearchDropdownOpen(false); // Close the search dropdown after selecting a result
  };

  // Toggle the user dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close user dropdown
        setSearchDropdownOpen(false); // Close search dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="max-w-screen-2xl mx-auto px-5 md:px-14 py-6">
      <nav className="flex justify-between">
        <div className="flex items-center gap-4 md:gap-16">
          <AiOutlineBars
            onClick={toggleSidebar}
            className="size-6 hover:cursor-pointer"
          />
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="relative" ref={searchDropdownRef}>
            <IoSearchOutline className="size-5 md:size-6 absolute inline-block inset-y-1 md:left-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyUp={handleSearch} // Trigger search on key press
              placeholder="Search here"
              className="bg-slate-200 w-3/4 md:w-full py-1 md:px-8 px-6 focus:outline-none rounded-sm font-primary"
              onFocus={() => setSearchDropdownOpen(true)} // Open search dropdown on focus
            />
            {/* popup with search results */}
            {isSearchDropdownOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 rounded-lg max-h-60 overflow-y-auto z-50">
                {searchResults.map((book) => (
                  <Link
                    to={`/books/${book._id}`} // Navigate to BookPreview
                    key={book._id}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleSearchResultClick(book._id)} // Close the dropdown on click
                  >
                    {book.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {currentUser ? (
          <div className="flex items-center justify-between gap-3 md:gap-5">
            {/* User Icon and Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="py-2"
                title="User menu"
              >
                <FaUser className="size-5" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 w-40 mt-2 bg-white shadow-lg rounded-md border">
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
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
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
