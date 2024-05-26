import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import Notification from "../pages/Notification";
import Setting from "../pages/Setting";

import { TbBrandBooking } from "react-icons/tb";
import AdminDashboard from "../pages/AdminDashboard";
import Booking from "../pages/AdminDashboard/Booking";
import Otp from "../pages/Otp";
import Profile from "../pages/Profile";
import UpdatePassword from "../pages/UpdatePassword";

export const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <MdDashboard />,
    element: <AdminDashboard />,
  },
  {
    name: "Booking",
    path: "booking",
    icon: <TbBrandBooking />,
    element: <Booking />,
  },

  // {
  //   name: "Control Panel",
  //   path: "control",
  //   icon: <MdManageHistory />,

  //   element: <Booking />,
  // },

  {
    name: "Setting",
    path: "setting",
    icon: <CiSettings />,
    element: <Setting />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "notification",
    element: <Notification />,
  },
  {
    path: "change-password",
    element: <ChangePasswordFrom />,
  },
  {
    path: "otp",
    element: <Otp />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
];
