import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import "./Dashboard.css";

const StoreOwnerDashboard = () => {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const response = await api.get("/dashboard/store-owner-stats");
      setStoreData(response.data);
    } catch (error) {
      toast.error("Failed to fetch store data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!storeData) {
    return <div className="container">No store data available</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Store Owner Dashboard</h1>

      <div className="store-info card">
        <h2>{storeData.store.name}</h2>
        <p className="store-email">{storeData.store.email}</p>
        <p className="store-address">{storeData.store.address}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Average Rating</h3>
          <div className="stat-value">
            {storeData.averageRating || "N/A"}
            <span className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`rating-star ${star <= Math.round(storeData.averageRating) ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <h3>Total Ratings</h3>
          <div className="stat-value">{storeData.totalRatings}</div>
        </div>
      </div>

      <div className="ratings-section card">
        <h2>Recent Ratings</h2>
        {storeData.recentRatings.length === 0 ? (
          <p className="no-data">No ratings yet</p>
        ) : (
          <div className="ratings-list">
            {storeData.recentRatings.map((rating) => (
              <div key={rating.id} className="rating-item">
                <div className="rating-header">
                  <div className="user-info">
                    <strong>{rating.user_name}</strong>
                    <span className="user-email">{rating.user_email}</span>
                  </div>
                  <div className="rating-display">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`rating-star ${star <= rating.rating ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rating-date">
                  {new Date(rating.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
