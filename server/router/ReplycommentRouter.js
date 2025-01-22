const express = require("express");
const router = express.Router();
const { createReplycomment, 
    getReplycomments, 
    getReplycommentById,
    getreplycommentbycomment,
    updateReplycomment, 
    deleteReplycomment 
} = require("../controller/ReplycommentController");

// method: POST
router.post("/api/replycomment/create", createReplycomment);

// method: GET
router.get("/api/replycomment/all", getReplycomments);
router.get("/api/replycomment/:id", getReplycommentById);
router.get("/api/replycomment/comment/:comment_id", getreplycommentbycomment);

// method: PUT
router.put("/api/replycomment/:id", updateReplycomment);

// method: DELETE
router.delete("/api/replycomment/:id", deleteReplycomment);


module.exports = router;