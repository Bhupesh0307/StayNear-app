import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import GuestHouses from "./Components/Guest House/guest-house.jsx";
import Upload from "./Components/Upload/Upload.jsx";
import PolicyPage from "./Components/Policy Page/policyPage.jsx";
import Login from "./Components/Auth/login.jsx";
import Signup from "./Components/Auth/signup.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import OwnerBookings from "./Components/Owner/OwnerBookings.jsx";
import OwnerProperties from "./Components/Owner/OwnerProperties.jsx";
import MyBookings from "./Components/Renter/MyBookings.jsx";

// 🧩 New imports for Auth and Protection
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";


// 🧭 Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="guest-house" element={<GuestHouses />} />
      <Route path="policy-page" element={<PolicyPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="upload-guest-house"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <Upload />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="owner-bookings"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="owner-properties"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerProperties />
          </ProtectedRoute>
        }
      />
      <Route
        path="my-bookings"
        element={
          <ProtectedRoute allowedRoles={["renter"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="owner-bookings"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerBookings />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);


// 🧠 Wrap everything with AuthProvider
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
