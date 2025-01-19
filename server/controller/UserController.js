const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtKeyword, jwtTime } = require("../utils/constant");
const pool = require("../utils/DatabaseConnect");

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, phone, email, order, password, role, tarif, deadline } = req.body;
            if (!name || !phone || !email || !order || !password || !role) {
                throw new Error("All fields are required");
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const query = `
                INSERT INTO users (name, phone, email, order_id, password, role, tarif)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
            `;
            const values = [name, phone, email, order, hashedPassword, role, tarif || "none"];

            const result = await pool.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    sign_in_email: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("Fill form");
            }

            const query = "SELECT id, password FROM users WHERE email = $1;";
            const result = await pool.query(query, [email]);

            if (result.rows.length === 0) {
                throw new Error("User not found");
            }

            const isPassword = await bcrypt.compare(password, result.rows[0].password);
            if (!isPassword) {
                throw new Error("Password invalid");
            }

            const token = jwt.sign({ id: result.rows[0].id }, jwtKeyword, { expiresIn: jwtTime });
            res.json({ status: true, data: token });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    decode: async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const data = jwt.verify(authorization, jwtKeyword);
            res.json({ status: true, data });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    get_datas: async (req, res, next) => {
        try {
            const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC;");
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    get_data: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
            if (result.rows.length === 0) {
                throw new Error("User not found");
            }
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    search_data: async (req, res, next) => {
        try {
            const { name, role, status, order } = req.query;
            let query = "SELECT * FROM users WHERE true";
            const values = [];

            if (name && name !== "all") {
                query += " AND name ILIKE $1";
                values.push(`%${name}%`);
            }
            if (role && role !== "all") {
                query += ` AND role = $${values.length + 1}`;
                values.push(role);
            }
            if (status && status !== "all") {
                query += ` AND status = $${values.length + 1}`;
                values.push(status === "true");
            }
            if (order && order !== "all") {
                query += ` AND order_id = $${values.length + 1}`;
                values.push(parseInt(order));
            }

            query += " ORDER BY created_at DESC;";
            const result = await pool.query(query, values);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    update_data: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, phone, email, role, tarif, deadline } = req.body;

            const query = `
                UPDATE users 
                SET name = COALESCE($1, name),
                    phone = COALESCE($2, phone),
                    email = COALESCE($3, email),
                    role = COALESCE($4, role),
                    tarif = COALESCE($5, tarif),
                    deadline = COALESCE($6, deadline)
                WHERE id = $7 RETURNING *;
            `;
            const values = [name, phone, email, role, tarif, deadline, id];

            const result = await pool.query(query, values);
            if (result.rows.length === 0) {
                throw new Error("User not found");
            }
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    recover_password: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword, confirmPassword } = req.body;

            if (!oldPassword || !newPassword || !confirmPassword) {
                throw new Error("Enter the passwords");
            }

            const query = "SELECT password FROM users WHERE id = $1;";
            const result = await pool.query(query, [id]);

            if (result.rows.length === 0) {
                throw new Error("User not found");
            }

            const isPassword = await bcrypt.compare(oldPassword, result.rows[0].password);
            if (!isPassword) {
                throw new Error("Old password invalid");
            }

            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            await pool.query("UPDATE users SET password = $1 WHERE id = $2;", [hashedPassword, id]);
            res.json({ status: true, message: "Password updated successfully" });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
};
