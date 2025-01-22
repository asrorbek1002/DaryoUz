const express = require('express');
const router = express.Router();
const { createApply, 
    getApply, 
    getApplyById, 
    getApplyByStatus, 
    updateApply,
    updateStatus
} = require('../controller/ApplyController');

// method: POST
router.post('/api/apply/create', createApply);

// method: GET
router.get('/api/apply/all', getApply);
router.get('/api/apply/:id', getApplyById);
router.get('/api/apply/status/:status', getApplyByStatus);

// method: PUT
router.put('/api/apply/:id', updateApply);
router.put('/api/apply/status/:id', updateStatus);

module.exports = router;
// Compare this snippet from server/router/AdsRouter.js:

module.exports = router;
