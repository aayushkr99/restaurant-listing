module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "menuTable",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
  
        itemName : {
          type: DataTypes.FLOAT,
          allowNull : false
        },
  
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        price: {
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