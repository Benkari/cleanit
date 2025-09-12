import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import Home from "../pages/home/Home";
import Layout from "../components/layout/Layout";
import Order from "../pages/order/Order";
import ShopOrders from "../pages/shopOrders/ShopOrders";
import OrderSuccess from "../pages/orderSuccess/OrderSuccess";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "order", element: <Order /> },
          { path: "shop-orders", element: <ShopOrders /> },
          { path: "order-success", element: <OrderSuccess /> },
        ],
      },
    ],
  },
]);
