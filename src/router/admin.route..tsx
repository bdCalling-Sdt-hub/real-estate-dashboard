import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import Notification from "../pages/Notification";
import Setting from "../pages/Setting";

import { TransactionOutlined, UserOutlined } from "@ant-design/icons";
import { FaRegBuilding } from "react-icons/fa6";
import { HiOutlineIdentification } from "react-icons/hi";
import { RiAdvertisementLine, RiSecurePaymentFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import AdminDashboard from "../pages/AdminDashboard";
import AboutUs from "../pages/AdminDashboard/AboutUs";
import AdverTisement from "../pages/AdminDashboard/AdverTisement";
import Booking from "../pages/AdminDashboard/Booking";
import Guest from "../pages/AdminDashboard/Guest";
import Host from "../pages/AdminDashboard/Host";
import IncomeHistory from "../pages/AdminDashboard/Income/IncomeHistory";
import PrivacyPolicy from "../pages/AdminDashboard/PrivacyPolicy";
import Property from "../pages/AdminDashboard/Property";
import CreateProperty from "../pages/AdminDashboard/Property/CreateProperty";
import Support from "../pages/AdminDashboard/Support";
import TermsAndConditions from "../pages/AdminDashboard/TermsAndCondition";
import VerificationRequest from "../pages/AdminDashboard/VerificatationRequest";
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
  // {
  //   name: "Sub Admin",
  //   path: "sub_admin",
  //   icon: <UserOutlined />,
  //   element: <SubAdmin />,
  // },

  {
    name: "Tenants",
    path: "Tenants",
    icon: <UserOutlined />,
    element: <Guest />,
  },
  {
    name: "Landlords",
    path: "landlords",
    icon: <UserOutlined />,
    element: <Host />,
  },
  {
    name: "Properties",
    path: "realState",
    icon: <FaRegBuilding />,
    element: <Property />,
  },
  {
    name: "Verification",
    path: "verification",
    icon: <HiOutlineIdentification />,
    element: <VerificationRequest />,
  },
  {
    name: "Advertisements",
    path: "advertisement",
    icon: <RiAdvertisementLine />,
    element: <AdverTisement />,
  },
  {
    name: "Reservations",
    path: "reservations",
    icon: <TbBrandBooking />,
    element: <Booking />,
  },

  {
    // name: "Real Estate",
    path: "realState/create",
    icon: <FaRegBuilding />,
    element: <CreateProperty />,
  },
  {
    name: "Income",
    icon: <RiSecurePaymentFill />,
    children: [
      // {
      //   name: "Overview",
      //   path: "income/overview",
      //   icon: <TransactionOutlined />,
      //   element: <IncomeOverview />,
      // },
      {
        name: "Transactions",
        path: "income/transaction",
        icon: <TransactionOutlined />,
        element: <IncomeHistory />,
      },
    ],
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
    name: "Settings",
    path: "setting",
    icon: <CiSettings />,
    element: <Setting />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "notifications",
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
