const express = require("express");
const router = express.Router();
const { createConfirmApply, 
    getConfirmApply, 
    getConfirmApplyById,
    updateConfirmApply, 
    deleteConfirmApply 
} = require("../controller/ConfirmApplyController");

// method: POST
router.post("/api/confirmapply/create", createConfirmApply);

// method: GET
router.get("/api/confirmapply/all", getConfirmApply);
router.get("/api/confirmapply/:id", getConfirmApplyById);

// method: PUT
router.put("/api/confirmapply/:id", updateConfirmApply);

// method: DELETE
router.delete("/api/confirmapply/:id", deleteConfirmApply);

module.exports = router;