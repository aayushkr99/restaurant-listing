const db = require("../database/connection");
const reviewTable = db.model("reviewTable");

const { validationResult } = require('express-validator');


// Create a new review
exports.createReview = 
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { restaurant_id, reviewDate, rating, comments, response } = req.body;
            let respo
            if(response == undefined){
                respo = ""
            }else{
                respo = response
            }
            const createdReview = await reviewTable.create({ rating, comments,reviewDate,response : respo,restaurant_id, customer_id : req.user.id,  });
            res.status(201).json({ status: true, message: 'Review created successfully', id: createdReview.id });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: false, message: 'Internal server error' });
        }
    };

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewTable.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await reviewTable.findByPk(id);
        if (!review) {
            return res.status(404).json({ status: false, message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const auth = await reviewTable.findOne({where : {id}});
        if(auth.customer_id !== req.user.id){
            if(req.user.role != "admin"){
                return res.status(401).json({ status: false, message: "Not allowed"}); 
            }
        }
        const [updatedRowsCount] = await reviewTable.update({ rating, comment }, { where: { id } });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ status: false, message: 'Review not found' });
        }
        res.status(200).json({ status: true, message: 'Review updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const auth = await reviewTable.findOne({where : {id}});
        if(auth.customer_id !== req.user.id ){
            if(req.user.role  != "admin"){
            return res.status(401).json({ status: false, message: "Not Allowed"}); 
            }
        }
        const deletedRowsCount = await reviewTable.destroy({ where: { id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ status: false, message: 'Review not found' });
        }
        res.status(200).json({ status: true, message: 'Review deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// API endpoint to allow business owners to respond to reviews
exports.respondToReview = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract review ID and response from request body
        const { reviewId } = req.params;
        const { response } = req.body;

        // Get user ID and role from token
        const { id: userId, role } = req.user;

        // Check if user is a business owner or admin
        if (role !== 'business') {
            return res.status(403).json({ message: 'Only business owners can respond to reviews' });
        }

        // Find the review by ID
        const review = await reviewTable.findOne({where : {id : reviewId}});
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the review belongs to the user's business
        if (review.customer_id !== userId) {
            return res.status(403).json({ message: 'You are not authorized to respond to this review' });
        }

        // Update the review with the response
        await reviewTable.update({ response }, {where : {id : reviewId}});

        // Return success response
        res.status(200).json({ message: 'Response added to review successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

