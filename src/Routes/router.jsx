import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import MyProperty from "../Pages/PropertyOwnerFlow/MyProperty";
import QRPage from "../Pages/PropertyOwnerFlow/QRPage";
import PropertyAddEdit from "../Pages/PropertyOwnerFlow/AddNewProperty/Layout";
import Profile from "../Pages/Profile/Layout";
import BuyerDashboard from "../Pages/Buyer/Dashboard/RootPage";
import PropertyDetailsRouter from "../Pages/Buyer/PropertyDetails.jsx/PropertyDetailsRouter";
import PropertyDocumentation from "../Pages/Buyer/PropertyDetails.jsx/Unlocked/PropertyDocumentation/RootPage";
import QRScanner from "../Pages/QRScanner/QRScanner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/scan-qr",
    element: <QRScanner />,
  },
  {
    path: "/my_properties",
    element: <MyProperty />,
  },
  {
    path: "/qr_link",
    element: <QRPage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
  {
    path: "/add_property",
    element: <PropertyAddEdit />,
  },
  {
    path: "/edit_properties",
    element: <PropertyAddEdit />,
  },
  {
    path: "/settings",
    element: <Profile />,
  },
  {
    path: "/buyer_dashboard",
    element: <BuyerDashboard />,
  },
  {
    path: "/property_details/:id",
    element: <PropertyDetailsRouter />,
  },
  {
    path: "/property_details/:id/property_documentation",
    element: <PropertyDocumentation />,
  },
]);
