const express = require("express");
const router = express.Router();
const { createnews, 
    getnews, 
    getnewsbyid,
    getnewsbycategory,
    getnewsbysubcategory,
    getnewsbyhashtag,
    getTopnewsbyrating,
    getTopnewsbyviews,
    search_news,
    updatenews, 
    deletenews 
} = require("../controller/NewsController");

// method: POST
router.post("/api/news/create", createnews);

// method: GET
router.get("/api/news/all", getnews);
router.get("/api/news/:id", getnewsbyid);
router.get("/api/news/category/:id", getnewsbycategory);
router.get("/api/news/subcategory/:id", getnewsbysubcategory);
router.get("/api/news/hashtag/:hashtag", getnewsbyhashtag);
router.get("/api/news/toprating/:count", getTopnewsbyrating);
router.get("/api/news/topviews/:count", getTopnewsbyviews);
router.get("/api/news/search/", search_news);

// method: PUT
router.put("/api/news/:id", updatenews);

// method: DELETE
router.delete("/api/news/:id", deletenews);

module.exports = router; // Export router to use in server.js