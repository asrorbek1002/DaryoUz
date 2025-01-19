const pool = require("../utils/DatabaseConnect");

module.exports = { 
    createsubcategory: async (req, res, next) => {
        try {
            const { name_uz, name_eng, name_ru, category_id } = req.body;
            if (!name_uz || !name_eng || !name_ru || !category_id) {
                throw new Error("All fields are required");
            }

            const query = `
                INSERT INTO subcategory (name_uz, name_eng, name_ru, category_id) VALUES ($1, $2, $3, $4) RETURNING *;
            `;
            const values = [name_uz, name_eng, name_ru, parseInt(category_id)];

            const result = await pool.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getsubcategory: async (req, res, next) => {
        try {
            const query = "SELECT * FROM subcategory WHERE status = true;";
            const result = await pool.query(query);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getsubcategorybyid: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = "SELECT * FROM subcategory WHERE id = $1;";
            const result = await pool.query(query, [id]);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    updatesubcategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name_uz, name_eng, name_ru, category_id } = req.body;
            if (!name_uz || !name_eng || !name_ru || !category_id) {
                throw new Error("All fields are required");
            }

            const query = `
                UPDATE subcategory SET name_uz = $1, name_eng = $2, name_ru = $3, category_id = $4, updated_at = NOW() WHERE id = $5 RETURNING *;
            `;
            const values = [name_uz, name_eng, name_ru, category_id, id];

            const result = await pool.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    deletesubcategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = "UPDATE subcategory SET status = false, updated_at = NOW() WHERE id = $1 RETURNING *;";
            const result = await pool.query(query, [id]);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    }
}