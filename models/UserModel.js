const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BlogPost = require("./BlogPostModel"); // Import the User model

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
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
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latest_tracked_location: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      return JSON.parse(this.getDataValue("latest_tracked_location"));
    },
    set(val) {
      this.setDataValue("latest_tracked_location", JSON.stringify(val));
    },
  },
  logbook: { type: DataTypes.STRING, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: true },
  profile_picture: { type: DataTypes.STRING, allowNull: true },
  pets: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return this.getDataValue("pets").split(";");
    },
    set(val) {
      this.setDataValue("pets", val.join(";"));
    },
  },
  address: { type: DataTypes.STRING, allowNull: true },
});

User.sync({ force: true }) // Use { force: true } to drop the table if it already exists
  .then(() => {
    console.log("User table created successfully");
  })
  .catch((error) => {
    console.error("Error creating user table:", error);
  });

module.exports = User;
