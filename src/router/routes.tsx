import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import MainLayout from "../layout/MainLayout";

import VerifyOtp from "../pages/VerifyOtp";
import NewPassword from "../pages/NewPassword";
import { routeGenerator } from "../utils/routeGenerator";
import { adminRoute } from "./admin.route";
import { vendorRoute } from "./vendor.route";
import PrivateRoute from "./PrivateRoutes";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminRoute),
  },
  {
    path: "/vendor",
    element: (
      <PrivateRoute role="vendor">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(vendorRoute),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
export default router;
