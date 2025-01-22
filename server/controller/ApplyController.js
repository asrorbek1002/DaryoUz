const connection = require("../utils/DatabaseConnect");

module.exports = {
   createApply: async (req, res) => {
         try {
              const { user_id, subject, message, file } = req.body;
              const query = `
                INSERT INTO apply (user_id, subject, message, file)
                VALUES ($1, $2, $3, $4)
                RETURNING *
              `
              const data = await connection.query(query, [user_id, subject, message, file]);
              res.status(200).send(data.rows[0]);
         } catch (error) {
              res.status(500).send(error);
         }
    },
    getApply: async (req, res) => {
         try {
              const query = `
                SELECT * FROM apply
              `
              const data = await connection.query(query);
              res.status(200).send(data.rows);
         } catch (error) {
              res.status(500).send(error);
         }
    },
    getApplyById: async (req, res) => {
         try {
              const id = req.params.id;
              const query = `
                SELECT * FROM apply WHERE id = $1
              `
              const data = await connection.query(query, [id]);
              res.status(200).send(data.rows[0]);
         } catch (error) {
              res.status(500).send(error);
         }
    },
    getApplyByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            const query = `
                SELECT * FROM apply WHERE status = $1
            `
            const data = await connection.query(query, [status]);
            res.status(200).send(data.rows);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateApply: async (req, res) => {
         try {
              const id = req.params.id;
              const { user_id, subject, message, file } = req.body;
              const query = `
                UPDATE apply
                SET user_id = $1, subject = $2, message = $3, file = $4
                WHERE id = $5
                RETURNING *
              `
              const data = await connection.query(query, [user_id, subject, message, file, id]);
              res.status(200).send(data.rows[0]);
         } catch (error) {
              res.status(500).send(error);
         }
    },
    deleteApply: async (req, res) => {
         try {
              const id = req.params.id;
              const query = `
                DELETE FROM apply WHERE id = $1
              `
              const data = await connection.query(query, [id]);
              res.status(200).send("Apply deleted");
         } catch (error) {
              res.status(500).send(error);
         }
    },
    updateStatus: async (req, res) => {
          try {
               const id = req.params.id;
               const status = req.body.status;
               const query = `
                         UPDATE apply
                         SET status = $1
                         WHERE id = $2
                         RETURNING *
               `
               const data = await connection.query(query, [status, id]);
               res.status(200).send(data.rows[0]);
          } catch (error) {
               res.status(500).send(error);
               }
      }

}