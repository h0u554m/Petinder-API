const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const ShelterPet = sequelize.define("Shelter_pets", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false }, // Enum: Mail, Female
  picture: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }, // Enum: Dog, Cat, Reptile, Bird, Mammal or Other
  decription: { type: DataTypes.STRING, allowNull: false },
  medical_info: { type: DataTypes.STRING, allowNull: false }, //!! change this with medical info model afterwards
});

ShelterPet.sync({ force: true }) // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((error) => {
    console.error("Error creating user table:", error);
  });

module.exports = ShelterPet;
