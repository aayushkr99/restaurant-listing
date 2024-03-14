const express = require('express');
const router = express.Router();


const bookingController = require('../controller/bookingController');
const { createBooking } = require('../validation/validator');
const {authenticateToken, authorizeRoles} = require("../middleware/auth");


// Create a new booking
router.post('/bookings',authenticateToken,createBooking() , bookingController.createBooking);

// Get all bookings
router.get('/bookings',authenticateToken, bookingController.getAllBookings);

// Get a single booking by ID
router.get('/bookings/:id',authenticateToken, bookingController.getBookingById);

// Update a booking
router.put('/bookings/:id',authenticateToken, bookingController.updateBooking);

// Cancel a booking
router.put('/bookings/:id/cancel',authenticateToken, bookingController.cancelBooking);

module.exports = router;
