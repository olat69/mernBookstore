import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/Home";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import BookPreview from "../pages/BookPreview";
import PrivateRoute from "./PrivateRoute";
import OrdersPage from "../pages/OrdersPage";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboad";
import AddBook from "../pages/dashboard/Addbook/AddBook";
import UpdateBook from "../pages/dashboard/Editbook/UpdateBook";
import ManageBooks from "../pages/dashboard/Managebook/ManageBook";
import ContactsPage from "../pages/ContactsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/contacts",
        element: <ContactsPage />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/checkoutpage",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <BookPreview />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <UpdateBook />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
