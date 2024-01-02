const { config } = require("dotenv");

config();

const PASSNODEMAILER = process.env.PASSNODEMAILER;

module.exports = PASSNODEMAILER;
