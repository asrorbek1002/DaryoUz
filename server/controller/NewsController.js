const connection = require("../utils/DatabaseConnect");

module.exports = {
    createnews: async (req, res, next) => {
        try {
            const { category_id, subcategory_id, title_uz, title_eng, title_ru, description_uz, description_eng, description_ru, image_source, image_url, hashtag } = req.body;
            if (!category_id || !subcategory_id || !title_uz || !title_eng || !title_ru || !description_uz || !description_eng || !description_ru || !image_source || !image_url) {
                throw new Error("All fields are required");
            }

            const query = `
                INSERT INTO news (category_id, subcategory_id, title_uz, title_eng, title_ru, description_uz, description_eng, description_ru, image_source, image_url, hashtag)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
            `;
            const values = [category_id, subcategory_id, title_uz, title_eng, title_ru, description_uz, description_eng, description_ru, image_source, image_url, hashtag];

            const result = await connection.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getnews: async (req, res, next) => {
        try {
            const query = "SELECT * FROM news WHERE status = true;";
            const result = await
            connection.query(query);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getnewsbyid: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = "SELECT * FROM news WHERE id = $1;";
            const result = await
            connection.query(query, [id]);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    updatenews: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { category_id, subcategory_id, title_uz, title_eng, title_ru, description_uz, description_eng, description_ru, image_source, image_url, hashtag } = req.body;
            if (!category_id || !subcategory_id || !title_uz || !title_eng || !title_ru || !description_uz || !description_eng || !description_ru || !image_source || !image_url) {
                throw new Error("All fields are required");
            }

            const query = `
                UPDATE news SET category_id = $1, subcategory_id = $2, hashtag = $3, title_uz = $4, title_eng = $5, title_ru = $6, description_uz = $7, description_eng = $8, description_ru = $9, image_source = $10, image_url = $11, updated_at = NOW() WHERE id = $12 RETURNING *;
            `;
            const values = [category_id, subcategory_id, hashtag, title_uz, title_eng, title_ru, description_uz, description_eng, description_ru, image_source, image_url, id];

            const result = await
            connection.query(query, values);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    deletenews: async (req, res, next) => {
        try {
            const { id } = req.params;
            const query = "UPDATE news SET status = false, updated_at = NOW() WHERE id = $1 RETURNING *;";
            const result = await
            connection.query(query, [id]);
            res.json({ status: true, data: result.rows[0] });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    search_news: async (req, res, next) => {
        try {
            const { title, category_id, subcategory_id, order, description } = req.params;
            console.log("Request Params:", req.params);
            // Parametrlarni tekshirish
            if (category_id && category_id !== "all" && isNaN(parseInt(category_id))) {
                return res.status(400).json({ status: false, message: "Invalid category_id, it must be an integer." });
            }
            if (subcategory_id && subcategory_id !== "all" && isNaN(parseInt(subcategory_id))) {
                return res.status(400).json({ status: false, message: "Invalid subcategory_id, it must be an integer." });
            }
            if (order && order !== "all" && isNaN(parseInt(order))) {
                return res.status(400).json({ status: false, message: "Invalid order, it must be an integer." });
            }
    
            let query = "SELECT * FROM news WHERE status = true";
            const values = [];
    
            if (title && title !== "all") {
                query += ` AND (title_uz ILIKE $${values.length + 1} OR title_eng ILIKE $${values.length + 1} OR title_ru ILIKE $${values.length + 1})`;
                values.push(`%${title}%`);
            }
            if (description && description !== "all") {
                query += ` AND (description_uz ILIKE $${values.length + 1} OR description_eng ILIKE $${values.length + 1} OR description_ru ILIKE $${values.length + 1})`;
                values.push(`%${description}%`);
            }
            if (category_id && category_id !== "all") {
                query += ` AND category_id = $${values.length + 1}`;
                values.push(parseInt(category_id));
            }
            if (subcategory_id && subcategory_id !== "all") {
                query += ` AND subcategory_id = $${values.length + 1}`;
                values.push(parseInt(subcategory_id));
            }
            if (order && order !== "all") {
                query += ` AND order_id = $${values.length + 1}`;
                values.push(parseInt(order));
            }
    
            query += " ORDER BY created_at DESC;";
            console.log("Generated Query:", query, "Values:", values);
    
            const result = await connection.query(query, values);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            console.error("Error in search_news:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    },   
    
    getTopnewsbyrating: async (req, res, next) => {
        try {
            const { count } = req.params;
            const query = "SELECT * FROM news WHERE status = true ORDER BY rating DESC LIMIT $1;";
            const result = await connection.query(query, [parseInt(count)]);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getTopnewsbyviews: async (req, res, next) => {
        try {
            const { count } = req.params;
            const query = "SELECT * FROM news WHERE status = true ORDER BY views DESC LIMIT $1;";
            const result = await connection.query(query, [parseInt(count)]);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getnewsbycategory: async (req, res, next) => {
        try {
            const { category_id } = req.params;
            const query = "SELECT * FROM news WHERE category_id = $1 AND status = true;";
            const result = await
            connection.query(query, [category_id]);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getnewsbysubcategory: async (req, res, next) => {
        try {
            const { subcategory_id } = req.params;
            const query = "SELECT * FROM news WHERE subcategory_id = $1 AND status = true;";
            const result = await
            connection.query(query, [subcategory_id]);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    },
    getnewsbyhashtag: async (req, res, next) => {
        try {
            const { hashtag } = req.params;
            console.log("Hashtag:", hashtag);
            const query = "SELECT * FROM news WHERE hashtag LIKE = $1 AND status = true;";

            const result = await connection.query(query, [hashtag]);
            console.log("Result:", result);
            res.json({ status: true, data: result.rows });
        } catch (error) {
            res.json({ status: false, message: error.message });
        }
    }
}