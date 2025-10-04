const { pool } = require("../config/database");

const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    // Check if store exists
    const storeExists = await pool.query(
      "SELECT * FROM stores WHERE email = $1",
      [email]
    );

    if (storeExists.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Store with this email already exists" });
    }

    // If ownerId is provided, update user to store owner
    if (ownerId) {
      await pool.query("UPDATE users SET is_store_owner = true WHERE id = $1", [
        ownerId,
      ]);
    }

    // Create store
    const newStore = await pool.query(
      "INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, address, ownerId]
    );

    res.status(201).json({
      message: "Store created successfully",
      store: newStore.rows[0],
    });
  } catch (error) {
    console.error("Create store error:", error);
    res.status(500).json({ message: "Error creating store" });
  }
};

const getStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const userId = req.user.id;

    let query = `
      SELECT 
        s.*,
        ROUND(AVG(r.rating)::numeric, 1) as average_rating,
        COUNT(DISTINCT r.id) as total_ratings,
        (
          SELECT rating 
          FROM ratings 
          WHERE store_id = s.id AND user_id = $1
        ) as user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;

    const params = [userId];
    let paramCount = 1;

    if (name) {
      paramCount++;
      query += ` AND s.name ILIKE $${paramCount}`;
      params.push(`%${name}%`);
    }

    if (address) {
      paramCount++;
      query += ` AND s.address ILIKE $${paramCount}`;
      params.push(`%${address}%`);
    }

    query += " GROUP BY s.id ORDER BY s.created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Get stores error:", error);
    res.status(500).json({ message: "Error fetching stores" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
        s.*,
        ROUND(AVG(r.rating)::numeric, 1) as average_rating,
        COUNT(DISTINCT r.id) as total_ratings,
        (
          SELECT rating 
          FROM ratings 
          WHERE store_id = s.id AND user_id = $1
        ) as user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.id = $2
      GROUP BY s.id`,
      [userId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get store error:", error);
    res.status(500).json({ message: "Error fetching store" });
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
};
