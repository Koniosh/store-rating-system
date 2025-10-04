import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "./StoreCard.css";

const StoreCard = ({ store, onRatingUpdate }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(store.user_rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleRatingSubmit = async (value) => {
    if (user.role === "admin") {
      toast.info("Admins cannot rate stores");
      return;
    }

    setSubmitting(true);
    try {
      const endpoint = store.user_rating
        ? `/ratings/${store.id}`
        : `/ratings/${store.id}`;

      const method = store.user_rating ? "put" : "post";

      await api[method](endpoint, { rating: value });

      setRating(value);
      toast.success("Rating submitted successfully!");

      if (onRatingUpdate) {
        onRatingUpdate();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit rating");
    }
    setSubmitting(false);
  };

  return (
    <div className="store-card">
      <h3 className="store-name">{store.name}</h3>
      <p className="store-email">{store.email}</p>
      <p className="store-address">{store.address}</p>

      <div className="store-rating-info">
        <div className="average-rating">
          <span className="rating-label">Average Rating:</span>
          <span className="rating-value">
            {store.average_rating || "No ratings yet"}
          </span>
          {store.average_rating && (
            <span className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`rating-star ${star <= Math.round(store.average_rating) ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </span>
          )}
        </div>

        <div className="total-ratings">
          {store.total_ratings}{" "}
          {store.total_ratings === 1 ? "rating" : "ratings"}
        </div>
      </div>

      {user.role === "normal" && (
        <div className="user-rating-section">
          <p className="rating-label">
            {store.user_rating ? "Your Rating:" : "Rate this store:"}
          </p>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`rating-star interactive ${
                  star <= (hoveredRating || rating) ? "filled" : ""
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => !submitting && handleRatingSubmit(star)}
              >
                ★
              </span>
            ))}
          </div>
          {store.user_rating && (
            <p className="rating-note">Click to update your rating</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreCard;
