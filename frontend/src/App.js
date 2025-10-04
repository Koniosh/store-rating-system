import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import Stores from "./pages/Stores";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />

                {/* Admin Routes */}
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Users />
                    </ProtectedRoute>
                  }
                />

                {/* Store Owner Routes */}
                <Route
                  path="store-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["normal"]} requireStoreOwner>
                      <StoreOwnerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* User Routes */}
                <Route
                  path="user-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["normal"]}>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Common Routes */}
                <Route path="stores" element={<Stores />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;