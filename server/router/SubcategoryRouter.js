const express = require("express");
const router = express.Router();
const { createsubcategory, 
    getsubcategory, 
    getsubcategorybyid, 
    updatesubcategory, 
    deletesubcategory 
} = require("../controller/SubcategoryController");

// method: POST
router.post("/api/subcategory/create", createsubcategory);

// method: GET
router.get("/api/subcategory/all", getsubcategory);
router.get("/api/subcategory/:id", getsubcategorybyid);

// method: PUT
router.put("/api/subcategory/:id", updatesubcategory);

// method: DELETE
router.delete("/api/subcategory/:id", deletesubcategory);

module.exports = router;