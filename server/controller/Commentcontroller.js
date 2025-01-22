const connection = require("../utils/DatabaseConnect");

module.exports = {
    // Get all comments
    getComments: async (req, res) => {
        const query = `
            SELECT * FROM comments
        `
        await connection.query(query)
            .then(result => res.json(result.rows))
            .catch(err => console.log(err))
    },
    // Get comment by id
    getCommentById: async (req, res) => {
        const id = req.params.id;
        const query = `
            SELECT * FROM comments WHERE id = $1
        `
        await connection.query(query, [id])
            .then(result => res.json(result.rows))
            .catch(err => console.log(err))
    },
    // Create a comment
    createComment: async (req, res) => {
        const { news_id, user_id, comment } = req.body;
        const query = `
            INSERT INTO comments (news_id, user_id, comment) VALUES ($1, $2, $3)
        `
        await connection.query(query, [news_id, user_id, comment])
            .then(() => res.json("Comment created"))
            .catch(err => console.log(err))
    },
    // Update a comment
    updateComment: async (req, res) => {
        const id = req.params.id;
        const { comment } = req.body;
        const query = `
            UPDATE comments SET comment = $1 WHERE id = $2
        `
        await connection.query(query, [comment, id])
            .then(() => res.json("Comment updated"))
            .catch(err => console.log(err))
    },
    // Delete a comment
    deleteComment: async (req, res) => {
        const id = req.params.id;
        const query = `
            DELETE FROM comments WHERE id = $1
        `
        await connection.query(query, [id])
            .then(() => res.json("Comment deleted"))
            .catch(err => console.log(err))
    },
    getcommentbynews: async (req, res) => {
        const news_id = req.params.news_id;
        const query = `
            SELECT * FROM comments WHERE news_id = $1
        `
        await connection.query(query, [news_id])
            .then(result => res.json(result.rows))
            .catch(err => console.log(err))
    }
}