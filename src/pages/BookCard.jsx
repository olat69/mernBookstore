/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    Swal.fire({
      title: "Added to Cart",
      text: `${product.title} has been added to your cart!`,
      icon: "success",
      confirmButtonText: "Okay",
      position: "center",
      timer: 3000,
    });
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 bg-white shadow-md p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="sm:h-72 w-full sm:w-48 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book?.title}
              className="w-full h-auto object-cover transition-all duration-200 hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3 sm:text-lg">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5 text-sm sm:text-base">
            {book?.description.length > 50
              ? `${book.description.slice(0, 50)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5 text-sm sm:text-base">
            ${book?.newPrice}{" "}
            <span className="line-through font-normal ml-2 text-xs sm:text-sm">
              ${book?.oldPrice}
            </span>
          </p>

          <button
            onClick={() => handleAddToCart(book)}
            className="bg-primary text-white rounded-md px-5 py-2 hover:bg-gray-700 transition-all"
          >
            <FiShoppingCart /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
