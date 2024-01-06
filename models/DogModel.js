const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Dog = sequelize.define("dogs", {
  breed: { type: DataTypes.STRING, allowNull: false },
  sociability_index: { type: DataTypes.STRING, allowNull: false }, //!! change this with SociabilityIndexModel
  is_this_dog_dominant: { type: DataTypes.BOOLEAN, allowNull: false },
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

Dog.sync({ force: true }) // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("Dog table created successfully");
  })
  .catch((error) => {
    console.error("Error creating dog table:", error);
  });

module.exports = Dog;
