import { useGetOrderByEmailQuery } from "../redux/features/orders/ordersApi";
import { useAuth } from "../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();

  const email = currentUser?.email;

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(email);

  if (!email) {
    return <div>Please log in to see your orders.</div>;
  }

  console.log("Fetching orders for:", email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error("Error getting orders:", isError);
    return <div>Error getting orders data</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border-b mb-4 pb-4">
              <p className="p-1 bg-secondary text-white w-10 rounded mb-1">
                # {index + 1}
              </p>
              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p className="text-gray-600">Name: {order.name}</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: #{order.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>{order.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
