const { pool } = require("../config/database");

const submitRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Check if store exists
    const storeExists = await pool.query("SELECT * FROM stores WHERE id = $1", [
      storeId,
    ]);

    if (storeExists.rows.length === 0) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Check if user already rated this store
    const existingRating = await pool.query(
      "SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2",
      [userId, storeId]
    );

    if (existingRating.rows.length > 0) {
      return res
        .status(400)
        .json({
          message:
            "You have already rated this store. Please use update instead.",
        });
    }

    // Create rating
    const newRating = await pool.query(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) RETURNING *",
      [userId, storeId, rating]
    );

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating.rows[0],
    });
  } catch (error) {
    console.error("Submit rating error:", error);
    res.status(500).json({ message: "Error submitting rating" });
  }
};

const updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Check if rating exists
    const existingRating = await pool.query(
      "SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2",
      [userId, storeId]
    );

    if (existingRating.rows.length === 0) {
      return res.status(404).json({ message: "Rating not found" });
    }

    // Update rating
    const updatedRating = await pool.query(
      "UPDATE ratings SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND store_id = $3 RETURNING *",
      [rating, userId, storeId]
    );

    res.json({
      message: "Rating updated successfully",
      rating: updatedRating.rows[0],
    });
  } catch (error) {
    console.error("Update rating error:", error);
    res.status(500).json({ message: "Error updating rating" });
  }
};

const getRatingsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const requestingUserId = req.user.id;

    // Check if user is store owner
    const storeCheck = await pool.query(
      "SELECT * FROM stores WHERE id = $1 AND owner_id = $2",
      [storeId, requestingUserId]
    );

    if (storeCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ message: "You can only view ratings for your own store" });
    }

    // Get ratings with user details
    const ratings = await pool.query(
      `SELECT 
        r.id,
        r.rating,
        r.created_at,
        r.updated_at,
        u.name as user_name,
        u.email as user_email
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = $1
      ORDER BY r.created_at DESC`,
      [storeId]
    );

    res.json(ratings.rows);
  } catch (error) {
    console.error("Get ratings error:", error);
    res.status(500).json({ message: "Error fetching ratings" });
  }
};

module.exports = {
  submitRating,
  updateRating,
  getRatingsByStore,
};
