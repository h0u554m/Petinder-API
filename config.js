const { config } = require("dotenv");

config();

const PASSNODEMAILER = process.env.PASSNODEMAILER;
const JWT_SECRET_RESET_PASSWORD = process.env.JWT_SECRET_RESET_PASSWORD;

module.exports = {
  PASSNODEMAILER,
  JWT_SECRET_RESET_PASSWORD,
};
