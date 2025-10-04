import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import AddUserModal from "../components/AddUserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params.append(key, filters[key]);
      });

      const response = await api.get(`/users?${params}`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
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
    fetchUsers();
  };

  const handleUserAdded = () => {
    setShowAddModal(false);
    fetchUsers();
    toast.success("User added successfully");
  };

  const viewUserDetails = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Users Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </button>
      </div>

      <form onSubmit={handleSearch} className="search-filters">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Search by email..."
          value={filters.email}
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
        <select
          name="role"
          className="form-control"
          value={filters.role}
          onChange={handleFilterChange}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="normal">Normal User</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Store Owner</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <span
                    className={`badge badge-${user.role === "admin" ? "danger" : "primary"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>{user.is_store_owner ? "Yes" : "No"}</td>
                <td>
                  {user.is_store_owner && user.average_rating ? (
                    <>
                      {user.average_rating}
                      <span className="rating-stars small">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`rating-star ${star <= Math.round(user.average_rating) ? "filled" : ""}`}
                          >
                            ★
                          </span>
                        ))}
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => viewUserDetails(user.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && <p className="no-data">No users found</p>}

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleUserAdded}
        />
      )}

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedUser(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Store Owner:</strong>{" "}
                {selectedUser.is_store_owner ? "Yes" : "No"}
              </p>
              {selectedUser.is_store_owner && selectedUser.average_rating && (
                <p>
                  <strong>Average Rating:</strong> {selectedUser.average_rating}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
