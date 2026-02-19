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
import ProtectedRoute from "../Components/ProtectedRoute";

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
    element: (
      <ProtectedRoute>
        <MyProperty />
      </ProtectedRoute>
    ),
  },
  {
    path: "/qr_link",
    element: (
      <ProtectedRoute>
        <QRPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
  {
    path: "/add_property",
    element: (
      <ProtectedRoute>
        <PropertyAddEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit_properties",
    element: (
      <ProtectedRoute>
        <PropertyAddEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/buyer_dashboard",
    element: (
      <ProtectedRoute>
        <BuyerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/property_details/:slug",
    element: (
      <ProtectedRoute>
        <PropertyDetailsRouter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/property_details/:slug/property_documentation",
    element: (
      <ProtectedRoute>
        <PropertyDocumentation />
      </ProtectedRoute>
    ),
  },
]);
