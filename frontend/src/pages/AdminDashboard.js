import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import AddUserModal from '../components/AddUserModal';
import AddStoreModal from '../components/AddStoreModal';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/admin-stats');
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    }
  };

  const handleUserAdded = () => {
    setShowAddUserModal(false);
    fetchStats();
    toast.success('User added successfully');
  };

  const handleStoreAdded = () => {
    setShowAddStoreModal(false);
    fetchStats();
    toast.success('Store added successfully');
  };

  const handleClearDatabase = async () => {
    try {
      await api.delete('/dashboard/clear-database');
      toast.success('Database cleared successfully');
      setShowClearConfirm(false);
      fetchStats();
    } catch (error) {
      toast.error('Failed to clear database');
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">👥</div>
          <h3>Total Users</h3>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">🏪</div>
          <h3>Total Stores</h3>
          <div className="stat-value">{stats.totalStores}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <h3>Total Ratings</h3>
          <div className="stat-value">{stats.totalRatings}</div>
        </div>
      </div>

      <div className="actions-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddUserModal(true)}
          >
            <span>➕</span> Add New User
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddStoreModal(true)}
          >
            <span>🏪</span> Add New Store
          </button>
          
          <button 
            className="btn btn-danger"
            onClick={() => setShowClearConfirm(true)}
          >
            <span>🗑️</span> Clear Database
          </button>
        </div>
      </div>

      {showAddUserModal && (
        <AddUserModal 
          onClose={() => setShowAddUserModal(false)}
          onSuccess={handleUserAdded}
        />
      )}

      {showAddStoreModal && (
        <AddStoreModal
          onClose={() => setShowAddStoreModal(false)}
          onSuccess={handleStoreAdded}
        />
      )}

      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Clear Database</h2>
              <button className="modal-close" onClick={() => setShowClearConfirm(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="warning-text">
                <strong>⚠️ Warning:</strong> This action will delete:
              </p>
              <ul>
                <li>All ratings</li>
                <li>All stores</li>
                <li>All normal users (admin accounts will remain)</li>
              </ul>
              <p className="warning-text">This action cannot be undone!</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleClearDatabase}
              >
                Clear Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;