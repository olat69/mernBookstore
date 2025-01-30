import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../redux/features/book/booksApi";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const BookPreview = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
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

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading book info</div>;

  if (!book) return <div>Book not found</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-full h-auto md:h-4/5 rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 md:mt-16 mb-4">
            {book.title}
          </h1>

          <p className="text-lg text-gray-700 mb-2">
            <strong>Author:</strong> {book.Author || "admin"}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Posted on:</strong>{" "}
            {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Description:</strong> {book.description}
          </p>

          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-gray-700 transition-all"
          >
            <FiShoppingCart className="text-xl" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
