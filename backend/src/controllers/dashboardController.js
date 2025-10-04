const { pool } = require("../config/database");

const getAdminStats = async (req, res) => {
  try {
    // Get total users
    const totalUsers = await pool.query("SELECT COUNT(*) as count FROM users");

    // Get total stores
    const totalStores = await pool.query(
      "SELECT COUNT(*) as count FROM stores"
    );

    // Get total ratings
    const totalRatings = await pool.query(
      "SELECT COUNT(*) as count FROM ratings"
    );

    res.json({
      totalUsers: parseInt(totalUsers.rows[0].count),
      totalStores: parseInt(totalStores.rows[0].count),
      totalRatings: parseInt(totalRatings.rows[0].count),
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
};

const clearDatabase = async (req, res) => {
  try {
    // Delete all ratings first (due to foreign key constraints)
    await pool.query("DELETE FROM ratings");

    // Delete all stores
    await pool.query("DELETE FROM stores");

    // Delete all users except the admin
    await pool.query("DELETE FROM users WHERE role != $1", ["admin"]);

    res.json({
      message: "Database cleared successfully",
      remainingUsers: 1,
    });
  } catch (error) {
    console.error("Clear database error:", error);
    res.status(500).json({ message: "Error clearing database" });
  }
};

const getStoreOwnerStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user is store owner
    if (!req.user.is_store_owner) {
      return res.status(403).json({ message: "You are not a store owner" });
    }

    // Get store details
    const store = await pool.query("SELECT * FROM stores WHERE owner_id = $1", [
      userId,
    ]);

    if (store.rows.length === 0) {
      return res.status(404).json({ message: "Store not found" });
    }

    const storeId = store.rows[0].id;

    // Get average rating
    const avgRating = await pool.query(
      "SELECT ROUND(AVG(rating)::numeric, 1) as average_rating, COUNT(*) as total_ratings FROM ratings WHERE store_id = $1",
      [storeId]
    );

    // Get recent ratings with user details
    const recentRatings = await pool.query(
      `SELECT 
        r.id,
        r.rating,
        r.created_at,
        u.name as user_name,
        u.email as user_email
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
      ORDER BY r.created_at DESC
      LIMIT 10`,
      [storeId]
    );

    res.json({
      store: store.rows[0],
      averageRating: avgRating.rows[0].average_rating || 0,
      totalRatings: parseInt(avgRating.rows[0].total_ratings),
      recentRatings: recentRatings.rows,
    });
  } catch (error) {
    console.error("Get store owner stats error:", error);
    res.status(500).json({ message: "Error fetching store statistics" });
  }
};

module.exports = {
  getAdminStats,
  getStoreOwnerStats,
  clearDatabase,
};
