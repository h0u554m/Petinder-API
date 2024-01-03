const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Mammal = sequelize.define("mammals", {
  type: { type: DataTypes.STRING, allowNull: false },
  owned_pet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "owned_pets",
      key: "id",
    },
  },
  shelter_pet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "shelter_pets",
      key: "id",
    },
  },
});

Mammal.sync({ force: true }) // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((error) => {
    console.error("Error creating user table:", error);
  });

module.exports = Mammal;
