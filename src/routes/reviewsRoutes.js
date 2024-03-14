const express = require('express');
const router = express.Router();
const {authenticateToken, authorizeRoles} = require("../middleware/auth");
const reviewsController = require('../controller/reviewsController');
const { createReview } = require('../validation/validator');
// Create a new review
router.post('/reviews',authenticateToken,authorizeRoles(['user', 'admin']),createReview(), reviewsController.createReview);

// Get all reviews
router.get('/reviews',  reviewsController.getAllReviews);

// Get a single review by ID
router.get('/reviews/:id', reviewsController.getReviewById);

// Update a review by ID
router.put('/reviews/:id',authenticateToken, reviewsController.updateReview);

// Delete a review by ID
router.delete('/reviews/:id',authenticateToken, authorizeRoles(['user', 'admin']), reviewsController.deleteReview);

module.exports = router;
