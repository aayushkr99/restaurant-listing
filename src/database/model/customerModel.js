module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "customerTable",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM,
        values: ["admin", "user", "owner"], //
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );
};
