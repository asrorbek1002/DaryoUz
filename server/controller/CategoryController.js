const pool = require("../utils/DatabaseConnect");


module.exports = {
    createcategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            if (!name) {
                throw new Error("All fields are required");
            }

            const query = `
                INSERT INTO category (name)
                VALUES ($1) RETURNING *;
            `;
            const values = [name];

            const result = await pool.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getcategory: async (req, res, next) => {
        try {
            const query = "SELECT * FROM category WHERE status = true;";
            const result = await pool.query(query);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
        },
    getcategorybyid: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = "SELECT * FROM category WHERE id = $1;";
            const result = await pool.query(query, [id]);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
        },
    updatecategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!name) {
                throw new Error("All fields are required");
            }

            const query = `
                UPDATE category SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *;
            `;
            const values = [name, id];

            const result = await pool.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    deletecategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = `
                UPDATE category SET status = false WHERE id = $1 RETURNING *;
            `;
            const result = await pool.query(query, [id]);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    }
}