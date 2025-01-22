const express = require("express");
const router = express.Router();
const { createcategory, 
    getcategory, 
    getcategorybyid, 
    updatecategory, 
    deletecategory 
} = require("../controller/CategoryController");


// @method: POST
router.post("/api/category/create", createcategory)

// @method: GET
router.get("/api/category/all", getcategory)
router.get("/api/category/:id", getcategorybyid)

// @method: PUT
router.put("/api/category/:id", updatecategory)

// @method: DELETE
router.delete("/api/category/:id", deletecategory)

module.exports = router;
