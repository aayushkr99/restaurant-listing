const express = require('express');
const router = express.Router();
const {authenticateToken, authorizeRoles} = require("../middleware/auth");
const { businessRegistrationRules } = require('../validation/validator');
const businessListingsController = require('../controller/businessListingsController');

// Create a new business listing
router.post('/business-listings',authenticateToken, authorizeRoles(['owner', 'admin']),businessRegistrationRules(),businessListingsController.createBusinessListing);

// Get all business listings
router.get('/business-listings',authenticateToken, businessListingsController.getAllBusinessListings);

// Get a single business listing by ID
router.get('/business-listings/:id',authenticateToken, businessListingsController.getBusinessListingById);

// Update a business listing by ID
router.put('/business-listings/:id',authenticateToken, authorizeRoles(['owner', 'admin']),  businessListingsController.updateBusinessListing);

// Delete a business listing by ID
router.delete('/business-listings/:id',authenticateToken,authorizeRoles(['admin']), businessListingsController.deleteBusinessListing);

module.exports = router;
