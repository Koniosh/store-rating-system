import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import StoreCard from "../components/StoreCard";
import "./Dashboard.css";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await api.get("/stores");
      setStores(response.data);
    } catch (error) {
      toast.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingUpdate = () => {
    fetchStores();
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Welcome to Store Rating System</h1>

      <div className="search-section">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search stores by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="stores-section">
        <div className="section-header">
          <h2>Available Stores</h2>
          <Link to="/stores" className="btn btn-primary">
            View All Stores
          </Link>
        </div>

        {filteredStores.length === 0 ? (
          <p className="no-data">No stores found</p>
        ) : (
          <div className="stores-grid">
            {filteredStores.slice(0, 6).map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onRatingUpdate={handleRatingUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
