// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>⭐ Store Rating System</h3>
            <p>Your trusted platform for honest store reviews and ratings.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/stores">Browse Stores</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>For Businesses</h3>
            <ul className="footer-links">
              <li>
                <a href="/business">Add Your Store</a>
              </li>
              <li>
                <a href="/dashboard">Store Dashboard</a>
              </li>
              <li>
                <a href="/analytics">Analytics</a>
              </li>
              <li>
                <a href="/support">Support</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>📧 info@storerating.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Rating Street, Review City, RC 12345</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2024 Store Rating System. All rights reserved. |
            <a href="/privacy"> Privacy Policy</a> |
            <a href="/terms"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
