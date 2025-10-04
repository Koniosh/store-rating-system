import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Layout.css";

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            Store Rating System
          </Link>

          <div className="navbar-menu">
            {user?.role === "admin" && (
              <>
                <Link
                  to="/dashboard"
                  className={`navbar-link ${isActive("/dashboard")}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/users"
                  className={`navbar-link ${isActive("/users")}`}
                >
                  Users
                </Link>
                <Link
                  to="/stores"
                  className={`navbar-link ${isActive("/stores")}`}
                >
                  Stores
                </Link>
              </>
            )}

            {user?.role === "normal" && !user.is_store_owner && (
              <>
                <Link
                  to="/user-dashboard"
                  className={`navbar-link ${isActive("/user-dashboard")}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/stores"
                  className={`navbar-link ${isActive("/stores")}`}
                >
                  Stores
                </Link>
              </>
            )}

            {user?.role === "normal" && user.is_store_owner && (
              <>
                <Link
                  to="/store-dashboard"
                  className={`navbar-link ${isActive("/store-dashboard")}`}
                >
                  Dashboard
                </Link>
              </>
            )}

            <Link
              to="/profile"
              className={`navbar-link ${isActive("/profile")}`}
            >
              Profile
            </Link>

            <button onClick={logout} className="navbar-link logout-btn">
              Logout
            </button>
          </div>

          <div className="navbar-user">
            <span className="user-info">
              {user?.name} ({user?.role}
              {user?.is_store_owner && " - Store Owner"})
            </span>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
