const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const OwnedPet = sequelize.define("owned_pets", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false }, // Enum : mail or female
  picture: { type: DataTypes.STRING, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: false }, // Enum : dog, cat, reptile, bird, mammal or Other
});

OwnedPet.sync({ force: true }) // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((error) => {
    console.error("Error creating user table:", error);
  });

module.exports = OwnedPet;
