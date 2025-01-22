const express = require('express');
const router = express.Router();
const { createRating, getRating, getRatingById, getRatingByNewsId, updateRating, deleteRating } = require('../controller/RatingController');

// method: POST
router.post('/api/rating/create', createRating);

// method: GET
router.get('/api/rating/all', getRating);
router.get('/api/rating/:id', getRatingById);
router.get('/api/rating/news/:id', getRatingByNewsId);

// method: PUT
router.put('/api/rating/:id', updateRating);

// method: DELETE
router.delete('/api/rating/:id', deleteRating);

module.exports = router;