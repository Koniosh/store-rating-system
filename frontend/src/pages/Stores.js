import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import StoreCard from "../components/StoreCard";
import { useAuth } from "../contexts/AuthContext";

const Stores = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append("name", filters.name);
      if (filters.address) params.append("address", filters.address);

      const response = await api.get(`/stores?${params}`);
      setStores(response.data);
    } catch (error) {
      toast.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores();
  };

  const handleRatingUpdate = () => {
    fetchStores();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">All Stores</h1>

      <form onSubmit={handleSearch} className="search-filters">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Search by store name..."
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="address"
          className="form-control"
          placeholder="Search by address..."
          value={filters.address}
          onChange={handleFilterChange}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {user?.role === "admin" && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Average Rating</th>
                <th>Total Ratings</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                  <td>
                    {store.average_rating || "N/A"}
                    {store.average_rating && (
                      <span className="rating-stars small">
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
                  </td>
                  <td>{store.total_ratings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user?.role === "normal" && (
        <div className="stores-grid">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onRatingUpdate={handleRatingUpdate}
            />
          ))}
        </div>
      )}

      {stores.length === 0 && <p className="no-data">No stores found</p>}
    </div>
  );
};

export default Stores;
