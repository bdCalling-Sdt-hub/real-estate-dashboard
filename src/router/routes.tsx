import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import NewPassword from "../pages/NewPassword";
import VerifyOtp from "../pages/VerifyOtp";
import { routeGenerator } from "../utils/routeGenerator";
import { adminRoutes } from "./admin.route.";
import PrivateRoute from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute role="admin">
        <App />
      </PrivateRoute>
    ),
  },

  {
    path: "/admin",

    element: (
      <PrivateRoute role="admin">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminRoutes),
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
