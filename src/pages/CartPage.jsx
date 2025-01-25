import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { getImgUrl } from "../utils/getImgUrl";
import { useNavigate } from "react-router-dom";
import {
  decrement,
  increment,
  removeItem,
} from "../redux/features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0
  );

  const handleIncrement = (itemId) => {
    dispatch(increment({ _id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrement({ _id: itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem({ _id: itemId }));
  };

  const handleProceedToCheckout = () => {
    // Pass totalPrice and cartItems using navigation state
    navigate("/checkoutpage", { state: { totalPrice, cartItems } });
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-primary font-semibold text-gray-800 mb-8 text-center sm:text-left">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">
          Your cart is empty. Add some books to your cart!
        </p>
      ) : (
        <>
          <div className="space-y-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <img
                  src={getImgUrl(item.coverImage)}
                  className="w-24 h-32 object-cover rounded-md mb-4 sm:mb-0"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold text-gray-800">
                      ${item.newPrice}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-xl font-semibold">
                    {item.quantity || 0}
                  </span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
            <div className="text-2xl font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 mt-4 sm:mt-0"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
