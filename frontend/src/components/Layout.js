// components/Layout.js
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from './Footer';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (user.role === 'admin') return '/dashboard';
    if (user.is_store_owner) return '/store-dashboard';
    return '/user-dashboard';
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to={getDashboardLink()} className="navbar-brand">
            Store Rating System
          </Link>
          
          <div className="navbar-menu">
            {user.role === 'admin' && (
              <>
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
                <Link to="/users" className="navbar-link">
                  Users
                </Link>
              </>
            )}
            
            <Link to="/stores" className="navbar-link">
              Stores
            </Link>
            
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
            
            <button onClick={handleLogout} className="navbar-link logout-btn">
              Logout
            </button>
            
            <button onClick={toggleTheme} className="theme-toggle-nav">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
          
          <div className="navbar-user">
            <span className="user-info">
              {user.name} ({user.role === 'admin' ? 'Admin' : 
                        user.is_store_owner ? 'Store Owner' : 'User'})
            </span>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;