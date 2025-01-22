const express = require("express");
const router = express.Router();
const { createAds, 
    getAds, 
    getAdsById,
    updateAds, 
    deleteAds 
} = require("../controller/AdvertisingController");

// method: POST
router.post("/api/ads/create", createAds);

// method: GET
router.get("/api/ads/all", getAds);
router.get("/api/ads/:id", getAdsById);

// method: PUT
router.put("/api/ads/:id", updateAds);

// method: DELETE
router.delete("/api/ads/:id", deleteAds);

module.exports = router;
