const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure usernames are unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure emails are unique
    validate: {
      isEmail: true, // Validate that the field is an email address
    },
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latest_tracked_location: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue("latest_tracked_location"));
    },
    set(val) {
      this.setDataValue("latest_tracked_location", JSON.stringify(val));
    },
  },
  logbook: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: false },
  profile_picture: { type: DataTypes.STRING, allowNull: false },
  pets: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("pets").split(";");
    },
    set(val) {
      this.setDataValue("pets", val.join(";"));
    },
  },
  address: { type: DataTypes.STRING, allowNull: false },
});

User.sync() // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((error) => {
    console.error("Error creating user table:", error);
  });

module.exports = User;
