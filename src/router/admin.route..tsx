import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import Notification from "../pages/Notification";
import Setting from "../pages/Setting";

import { UserOutlined } from "@ant-design/icons";
import { FaRegBuilding } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import AdminDashboard from "../pages/AdminDashboard";
import AboutUs from "../pages/AdminDashboard/AboutUs";
import Booking from "../pages/AdminDashboard/Booking";
import PrivacyPolicy from "../pages/AdminDashboard/PrivacyPolicy";
import Property from "../pages/AdminDashboard/Property";
import SubAdmin from "../pages/AdminDashboard/SubAdmin";
import Support from "../pages/AdminDashboard/Support";
import TermsAndConditions from "../pages/AdminDashboard/TermsAndCondition";
import User from "../pages/AdminDashboard/User";
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
    name: "Sub Admin",
    path: "sub_admin",
    icon: <UserOutlined />,
    element: <SubAdmin />,
  },
  {
    name: "User",
    path: "user",
    icon: <UserOutlined />,
    element: <User />,
  },
  {
    name: "Booking",
    path: "booking",
    icon: <TbBrandBooking />,
    element: <Booking />,
  },
  {
    name: "Property",
    path: "property",
    icon: <FaRegBuilding />,
    element: <Property />,
  },
  {
    path: "aboutUs",
    element: <AboutUs />,
  },
  {
    path: "termsAndCondition",
    element: <TermsAndConditions />,
  },
  {
    path: "privacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "support",
    element: <Support />,
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
