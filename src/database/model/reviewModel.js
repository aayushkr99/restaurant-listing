module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "reviewTable",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
  
        rating : {
          type: DataTypes.FLOAT,
          allowNull : false
        },
  
        comments: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        reviewDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        
        response: {
          type: DataTypes.STRING, 
          allowNull: true,
      }
      },
      {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
      }
    );
  };