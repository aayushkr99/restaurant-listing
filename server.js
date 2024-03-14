
const express = require('express')
const app = express()
const config= require("./src/config/config.json")
const sequelize = require("./src/database/connection");
const auth = require("./src/routes/authRoutes");
const business = require("./src/routes/businessListingsRoutes");
const reviews = require("./src/routes/reviewsRoutes");
const booking = require("./src/routes/bookingRoutes");

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    
    app.use('/api/user/auth' , auth)
    app.use('/api/business', business)
    app.use('/api/user/', reviews)
    app.use('/api/book/', booking)
    
    const runServer = async () => {    
        const dbConnect = async () => {
            try {
              await sequelize.sync();
              console.log("Connection has been established successfully.");
            } catch (error) {
              console.error("Unable to connect to the database:", error);
              console.log("reconnecting to db .......");
              setTimeout(dbConnect, 10000);
            }
          };
          dbConnect();
    try {
        // creating express server
        app.listen( config.SERVER_PORT, function () {
            console.log(`Express Server running on http://localhost:${config.SERVER_PORT}`);
        });
    } catch (error) {
        console.log('failed to start the server')
    }
}
runServer()

module.exports = app