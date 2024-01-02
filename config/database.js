// config/database.js

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("petinder_db", "postgres", "123456", {
  host: "localhost", // postgres-container
  dialect:
    "postgres" /* one of 'mysql' | '' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  define: {
    timestamps: false,
  },
  createDatabase: true, // This option will automatically create the database if it doesn't exist
  logging: true, // You can set this to true to see Sequelize query logging
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
