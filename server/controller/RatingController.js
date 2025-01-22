const connection = require("../utils/DatabaseConnect");

module.exports = {
    createRating: async (req, res) => {
        try {
            const { user_id, news_id, rating, review } = req.body;
            const query = `
                INSERT INTO rating (user_id, news_id, rating, review)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const data = await connection.query(query, [user_id, news_id, rating, review]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getRating: async (req, res) => {
        try {
            const query = `
                SELECT * FROM rating
            `;
            const data = await connection.query(query);
            res.status(200).send(data.rows);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getRatingById: async (req, res) => {
        try {
            const id = req.params.id;
            const query = `
                SELECT * FROM rating WHERE id = $1
            `;
            const data = await connection.query(query, [id]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getRatingByNewsId: async (req, res) => {
        try {
            const news_id = req.params.news_id;
            const query = `
                SELECT * FROM rating WHERE news_id = $1
            `;
            const data = await connection.query(query, [news_id]);
            res.status(200).send(data.rows);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateRating: async (req, res) => {
        try {
            const id = req.params.id;
            const { user_id, news_id, rating, review } = req.body;
            const query = `
                UPDATE rating
                SET user_id = $1, news_id = $2, rating = $3, review = $4, updated_at = NOW()
                WHERE id = $5
                RETURNING *
            `;
            const data = await connection.query(query, [user_id, news_id, rating, review, id]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteRating: async (req, res) => {
        try {
            const id = req.params.id;
            const query = `
                DELETE FROM rating WHERE id = $1
                RETURNING *
            `;
            const data = await connection.query(query, [id]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};