const db = require("../database/connection");
const restaurantTable = db.model("restaurantTable");
const { validationResult, body } = require('express-validator');

// Create a new business listing
exports.createBusinessListing = 
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { businessName, address, city, features, pricing, phoneNumber, imageUrl } = req.body;
            const restaurantEntity = {
                businessName,
                address,
                city,
                features,
                pricing,
                phoneNumber,
                imageUrl,
                isActive : true,
                customer_id : req.user.id            
            };

            const createdRestaurant = await restaurantTable.create(restaurantEntity);
            res.status(201).json({ status: true, message: `Business ${createdRestaurant.businessName} created successfully` });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: false, message: 'Internal server error' });
        }
    }

// Get all business listings
exports.getAllBusinessListings = async (req, res) => {
    try {
        const businessList = await restaurantTable.findAll({ where: { isActive: true } });
        res.status(200).json({ status: true, data: businessList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// Get a single business listing by ID
exports.getBusinessListingById = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await restaurantTable.findOne({ where: { id, isActive: true } });
        if (!business) {
            return res.status(404).json({ status: false, message: 'Business listing not found' });
        }
        res.status(200).json({ status: true, data: business });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// Update a business listing by ID
exports.updateBusinessListing = async (req, res) => {
    try {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        const { id } = req.params;
        const { businessName, address, city, features, phoneNumber, imageUrl } = req.body;

        // Validate request body
        const validateCustomerId = await restaurantTable.findOne({
            where : {id},
            raw : true
        })

        console.log("validateCustomer -=-=", validateCustomerId)
        if(req.user.role !== "admin" && req.user.id !== validateCustomerId.customer_id){
            return res.status(403).json({ status: false, message: 'You are not the business Owner' });
        }

        const [updatedRowsCount] = await restaurantTable.update({
            businessName,
            address,
            city,
            features,
            phoneNumber,
            imageUrl
        }, {
            where: { id }
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ status: false, message: 'Business listing not found' });
        }

        res.status(200).json({ status: true, message: 'Business listing updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

// Delete a business listing by ID
exports.deleteBusinessListing = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowsCount = await restaurantTable.update({ isActive: false }, { where: { id } });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ status: false, message: 'Business listing not found' });
        }

        res.status(200).json({ status: true, message: 'Business listing deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
