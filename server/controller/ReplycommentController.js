const connection = require("../utils/DatabaseConnect");

module.exports =  {
    createReplycomment: async (req, res) => {
        const { comment_id, user_id, reply } = req.body;
        const query = `
            INSERT INTO replycomments (comment_id, user_id, reply) VALUES ($1, $2, $3)
        `
        await connection.query(query, [comment_id, user_id, reply])
            .then(() => res.json("Replycomment created"))
            .catch(err => console.log(err))
    },
    getReplycomments: async (req, res) => {
        const query = `
            SELECT * FROM replycomments
        `
        await connection.query(query)
            .then(result => res.json(result.rows))
            .catch(err => console.log(err))
        
    },
    getReplycommentById: async (req, res) => {
        const id = req.params.id;
        const query = `
            SELECT * FROM replycomments WHERE id = $1
        `
        await connection.query(query, [id])
            .then(result => res.json(result.rows))
            .catch(err => console.log(err))
    },
    updateReplycomment: async (req, res) => {
        const id = req.params.id;
        const { reply } = req.body;
        const query = `
            UPDATE replycomments SET reply = $1 WHERE id = $2
        `
        await connection.query(query, [reply, id])
            .then(() => res.json("Replycomment updated"))
            .catch(err => console.log(err))
    },
    deleteReplycomment: async (req, res) => {
        const id = req.params.id;
        const query = `
            DELETE FROM replycomments WHERE id = $1
        `
        await connection.query(query, [id])
            .then(() => res.json("Replycomment deleted"))
            .catch(err => console.log(err))
    },
    getreplycommentbycomment: async (req, res) => {
        const comment_id = req.params.comment_id;
        const query = `
            SELECT * FROM replycomments WHERE comment_id = $1
        `
        await connection.query(query, [comment_id])
            .then(result => res.json(result.rows))
            .catch(err => console.log(err))
    }
    
}