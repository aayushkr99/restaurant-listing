module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "bookingTable",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
  
        bookingDate : {
          type: DataTypes.STRING,
          allowNull : false
        },
  
        bookingTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        numberOfPeople: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isCancelled : {
          type: DataTypes.BOOLEAN,
          allowNull : false,
          default : false
        },
        pricing: {
          type: DataTypes.FLOAT,
          allowNull: false,
        }
      },
      {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
      }
    );
  };