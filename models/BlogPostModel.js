const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./UserModel"); // Import the User model

const BlogPost = sequelize.define("blogPosts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

BlogPost.sync({ force: true })
  .then(() => {
    console.log("BlogPost table created successfully");
  })
  .catch((error) => {
    console.error("Error creating BlogPost table:", error);
  });

module.exports = BlogPost;
