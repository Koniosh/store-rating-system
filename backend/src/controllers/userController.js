const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role, isStoreOwner } = req.body;

    // Check if user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, address, role, is_store_owner) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, address, role, is_store_owner",
      [
        name,
        email,
        hashedPassword,
        address,
        role || "normal",
        isStoreOwner || false,
      ]
    );

    res.status(201).json({
      message: "User created successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    let query = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.address, 
        u.role, 
        u.is_store_owner,
        CASE 
          WHEN u.is_store_owner = true THEN (
            SELECT ROUND(AVG(r.rating)::numeric, 1)
            FROM stores s
            JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = u.id
          )
          ELSE NULL
        END as average_rating
      FROM users u
      WHERE 1=1
    `;

    const params = [];
    let paramCount = 0;

    if (name) {
      paramCount++;
      query += ` AND u.name ILIKE $${paramCount}`;
      params.push(`%${name}%`);
    }

    if (email) {
      paramCount++;
      query += ` AND u.email ILIKE $${paramCount}`;
      params.push(`%${email}%`);
    }

    if (address) {
      paramCount++;
      query += ` AND u.address ILIKE $${paramCount}`;
      params.push(`%${address}%`);
    }

    if (role) {
      paramCount++;
      query += ` AND u.role = $${paramCount}`;
      params.push(role);
    }

    query += " ORDER BY u.created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.address, 
        u.role, 
        u.is_store_owner,
        CASE 
          WHEN u.is_store_owner = true THEN (
            SELECT ROUND(AVG(r.rating)::numeric, 1)
            FROM stores s
            JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = u.id
          )
          ELSE NULL
        END as average_rating
      FROM users u
      WHERE u.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
