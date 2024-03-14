RESTAURANT LISTING PLATFORM


This is a web application that serves as a restaurant listing platform. It allows users to browse information about various restaurants, view menus, images, addresses, features, pricing, and reviews. Additionally, users can book a table for dining or call the restaurant for ordering. The platform facilitates interaction between businesses (vendors) and users (customers).


FEATURES :-

User authentication using JWT (JSON Web Tokens).
Role-based access control with three user authorization levels: Business Owner, User, and Admin.
CRUD operations for managing business listings, including creating, reading, updating, and deleting listings.
CRUD operations for managing reviews, allowing users to create, read, update, and delete reviews.
Business owners can respond to reviews left by users.
Booking functionality for users to reserve tables at restaurants.


TECHNOLOGIES USED :-

Node.js
Express.js
Sequelize ORM (Object-Relational Mapping)
MySQL database
JSON Web Tokens (JWT) for authentication
Express Validator for request validation
Bcrypt for password hashing


USAGE :- 

Register as a new user or log in if you already have an account.
Explore restaurant listings, view details, and read reviews.
Book a table for dining or call the restaurant for ordering.
Leave reviews for restaurants you've visited.
Business owners can respond to reviews left by users.
Admins have access to manage business listings and reviews.


API DOCUMENTATION :-

Authentication Endpoints:

POST /api/user/auth/register: Register a new user.
POST /api/user/auth/login: Log in and generate a JWT token.


Business Listing Endpoints:

GET /api/business/business-listings: Get all business listings.
GET /api/business/business-listings/:id: Get a single business listing by ID.
POST /api/business/business-listings: Create a new business listing.
PUT /api/business/business-listings/:id: Update an existing business listing.
DELETE /api/business/business-listings/:id: Delete a business listing.


Review Endpoints:

GET /api/user/reviews: Get all reviews.
GET /api/user/reviews/:id: Get a single review by ID.
POST /api/user/reviews: Create a new review.
PUT /api/user/reviews/:id: Update an existing review.
DELETE /api/user/reviews/:id: Delete a review.


Booking Endpoints:

POST /api/book/bookings: Create a new booking.
GET /api/book/bookings: Get all bookings.
GET /api/book/bookings/:id: Get a single booking by ID.
PUT /api/book/bookings/:id: Update an existing booking.
DELETE /api/book/bookings/:id: Cancel a booking.

For detailed API documentation, refer to the API Documentation section.

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or bug fixes.

License
This project is not licensed.
