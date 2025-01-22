const connection = require("../utils/DatabaseConnect");


module.exports = {
    createConfirmApply: async (req, res) => {
        try {
            const { apply_id, message } = req.body;
            const query = `
                INSERT INTO confirm (apply_id, message)
                VALUES ($1, $2)
                RETURNING *
            `;
            const data = await connection.query(query, [apply_id, message]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getConfirmApply: async (req, res) => {
        try {
            const query = `
                SELECT * FROM confirm
            `;
            const data = await connection.query(query);
            res.status(200).send(data.rows);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getConfirmApplyById: async (req, res) => {
        try {
            const id = req.params.id;
            const query = `
                SELECT * FROM confirm WHERE id = $1
            `;
            const data = await connection.query(query, [id]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateConfirmApply: async (req, res) => {
        try {
            const id = req.params.id;
            const { apply_id, message, status } = req.body;
            const query = `
                UPDATE confirm
                SET apply_id = $1, message = $2, status = $3, updated_at = NOW()
                WHERE id = $4
                RETURNING *
            `;
            const data = await connection.query(query, [apply_id, message, status, id]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteConfirmApply: async (req, res) => {
        try {
            const id = req.params.id;
            const query = `
                DELETE FROM confirm WHERE id = $1
                RETURNING *
            `;
            const data = await connection.query(query, [id]);
            res.status(200).send(data.rows[0]);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};