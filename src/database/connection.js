const Sequelize  = require("sequelize");
const config = require("../config/config.json");

const restaurantModel = require("./model/restaurantModel")
const bookingModel = require("./model/bookingModel")
const customerModel = require("./model/customerModel")
const menuModel = require("./model/menuModel")
const reviewModel = require("./model/reviewModel")


const connection = {
  timezone: "+05:30",
  ...config.development,
  logging: false, // Enable logging for development
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }, dialectOptions: {
    connectTimeout: 60000, // Set a higher timeout value (in milliseconds)
  },
};

const sequelize = new Sequelize(connection);

const booking = bookingModel(sequelize, Sequelize);
const restaurant = restaurantModel(sequelize, Sequelize);
const customer = customerModel(sequelize, Sequelize);
const menu = menuModel(sequelize, Sequelize);
const review = reviewModel(sequelize, Sequelize);


menu.belongsTo(restaurant, { foreignKey: "restaurant_id" });
booking.belongsTo(restaurant, {foreignKey: "restaurant_id"});
booking.belongsTo(customer, {foreignKey: "customer_id"});
review.belongsTo(customer, {foreignKey: "customer_id"});
review.belongsTo(restaurant, {foreignKey: "restaurant_id"});
restaurant.belongsTo(customer, {foreignKey : "customer_id"});


module.exports = sequelize;