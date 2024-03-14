const db = require("../database/connection");
const Booking = db.model("bookingTable");

exports.createBooking = async (req, res) => {
    try {
        const { bookingDate, bookingTime, numberOfPeople, pricing,restaurant_id } = req.body;
        
        // Create the booking
        const newBooking = await Booking.create({
            bookingDate,
            bookingTime,
            numberOfPeople,
            isCancelled : false,
            pricing,
            restaurant_id,
            customer_id : req.user.id
            // Set the restaurant_id and customer_id based on the logged-in user or request data
        });

        res.status(201).json({ status: true, message: 'Booking created successfully', data: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        // Retrieve all bookings
        const bookings = await Booking.findAll();

        res.status(200).json({ status: true, data: bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Retrieve booking by ID
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ status: false, message: 'Booking not found' });
        }

        res.status(200).json({ status: true, data: booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { bookingDate, bookingTime, numberOfPeople } = req.body;

        // Update the booking
        const updatedBooking = await Booking.update({
            bookingDate,
            bookingTime,
            numberOfPeople,
            // Optionally set other fields to update
        }, {
            where: { id }
        });

        res.status(200).json({ status: true, message: 'Booking updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Update the booking's isCancelled status to true
        await Booking.update(
            { isCancelled: true },
            { where: { id } }
        );

        res.status(200).json({ status: true, message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
