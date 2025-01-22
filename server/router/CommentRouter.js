const express = require("express");
const router = express.Router();
const { createComment, 
    getComments, 
    getCommentById,
    getcommentbynews,
    updateComment, 
    deleteComment 
} = require("../controller/Commentcontroller");

// method: POST
router.post("/api/comment/create", createComment);

// method: GET
router.get("/api/comment/all", getComments);
router.get("/api/comment/:id", getCommentById);
router.get("/api/comment/news/:id", getcommentbynews);

// method: PUT
router.put("/api/comment/:id", updateComment);

// method: DELETE
router.delete("/api/comment/:id", deleteComment);

module.exports = router;
