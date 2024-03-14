const { body } = require('express-validator');

exports.registerValidationRules = () => {
    return [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('phoneNumber').notEmpty().withMessage('Phone number is required').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
        body('role').notEmpty().withMessage("Please select a role [admin, owner, user]").isIn(['admin', 'owner', 'user']).withMessage('Invalid role value')
    ];
};

exports.loginValidationRules = () => {
    return [
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ];
};

exports.businessRegistrationRules = () => {
    return [
        body('businessName').notEmpty().withMessage('BusinessName is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('features').notEmpty().withMessage('Features are required'),
        body('phoneNumber').notEmpty().withMessage('Phone number is required').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
        body('imageUrl').notEmpty().withMessage('Image URL is required'),
    ]
}

// exports.updateBooking = () => {
//     return [
//         body('bookingDate').notEmpty().withMessage('Booking date is required'),
//         body('bookingTime').notEmpty().withMessage('Booking time is required'),
//         body('numberOfPeople').notEmpty().withMessage('Number of people is required').isInt({ min: 1 }).withMessage('Number of people must be a positive integer'),
//         body('pricing').notEmpty().withMessage('Pricing is required'),
//         body('restaurant_id').notEmpty().withMessage('Restaurant ID is required'),
//     ]
// }

exports.createBooking = () => {
    return [
        body('bookingDate').notEmpty().withMessage('Booking date is required'),
        body('bookingTime').notEmpty().withMessage('Booking time is required'),
        body('numberOfPeople').notEmpty().withMessage('Number of people is required').isInt({ min: 1 }).withMessage('Number of people must be a positive integer'),
        body('pricing').notEmpty().withMessage('Pricing is required'),
        body('restaurant_id').notEmpty().withMessage('Restaurant ID is required'),
    ]
}

exports.createReview = () => {
    return [
        body('rating').notEmpty().withMessage('Rating is required'),
        body('comments').notEmpty().withMessage('Comment is required'),
        body('reviewDate').notEmpty().withMessage('reviewDate is required'),

    body('restaurant_id').notEmpty().withMessage('Restaurant ID is required'),
    // body('customer_id').notEmpty().withMessage('Customer ID is required'),
    ]
} 