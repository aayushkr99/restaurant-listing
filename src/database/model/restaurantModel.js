module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "restaurantTable",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      businessName : {
        type: DataTypes.STRING,
        allowNull : false
      },

      address: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      features: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imageUrl : {
        type : DataTypes.STRING,
        allowNull : false
      },
      isActive : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        default : true
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );
};