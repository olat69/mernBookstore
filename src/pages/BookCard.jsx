/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const handleAddToCart = (item) => {
    if (!currentUser) {
      Swal.fire({
        title: "Please Login",
        text: "You must be logged in to add items to your cart.",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      dispatch(addToCart(item));
      Swal.fire({
        title: "Added to Cart",
        text: `${item.title} has been added to your cart!`,
        icon: "success",
        confirmButtonText: "Okay",
        position: "center",
        timer: 3000,
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg transition-shadow duration-300 bg-white shadow-md p-4 flex flex-col h-[450px]">
      <div className="sm:h-72 w-full sm:w-48 sm:flex-shrink-0 border rounded-md overflow-hidden">
        <Link to={`/books/${book._id}`}>
          <img
            src={`${getImgUrl(book?.coverImage)}`}
            alt={book?.title}
            className="w-full h-full object-cover transition-all duration-200 hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-2">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-xl font-semibold hover:text-blue-600 mb-1 text-ellipsis overflow-hidden whitespace-nowrap">
            {book?.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2 overflow-hidden">
          {book?.description}
        </p>

        <div className="flex flex-col justify-between sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0">
            <p className="font-primary text-lg sm:text-lg">#{book?.Price}</p>
          </div>

          <button
            onClick={() => handleAddToCart(book)}
            className="bg-primary text-white rounded-md px-5 py-2 mt-3 sm:mt-0 hover:bg-gray-700 transition-all w-full sm:w-auto flex items-center justify-center sm:justify-start"
          >
            <span className="mr-2">
              <FiShoppingCart />
            </span>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
