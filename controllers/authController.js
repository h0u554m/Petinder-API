// authController.js
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel"); // Assuming your Sequelize model is named 'User'

const generateTokens = (user) => {
  const secretKey = "Petinder";
  const accessTokenPayload = {
    userId: user.id,
    username: user.name,
    // Add other relevant information
  };
  const refreshTokenPayload = {
    userId: user.id,
  };

  const accessToken = jwt.sign(accessTokenPayload, secretKey, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(refreshTokenPayload, secretKey, {
    expiresIn: "7d", // Set the expiration as per your requirements
  });

  return { accessToken, refreshToken };
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ where: { username: username } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    true;

    if (passwordMatch) {
      // Passwords match, generate a JWT token
      const { accessToken, refreshToken } = generateTokens(newUser);

      // Send the token in the response
      res.json({ accessToken, refreshToken });
    } else {
      // Passwords do not match
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const {
    username,
    password,
    email,
    Country,
    latest_tracked_location,
    logbook,
    name,
    profile_picture,
    pets,
    address,
  } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await UserModel.findOne({ where: { username } });
    console.log(existingUser);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
      Country,
      latest_tracked_location,
      logbook,
      name,
      profile_picture,
      pets,
      address,
    });

    // Generate a JWT token
    const { accessToken, refreshToken } = generateTokens(user);

    // Send the tokens in the response
    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
