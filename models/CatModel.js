const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Cat = sequelize.define("cats", {
  breed: { type: DataTypes.STRING, allowNull: false },
  sociability_index: { type: DataTypes.STRING, allowNull: false }, //!! change this with SociabilityIndexModel
  is_this_cat_dominant: { type: DataTypes.BOOLEAN, allowNull: false },
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

Cat.sync({ force: true }) // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((error) => {
    console.error("Error creating user table:", error);
  });

module.exports = Cat;
