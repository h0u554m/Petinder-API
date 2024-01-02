// authController.js

const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const UserModel = require("./path-to-your-user-model");

const generateToken = (user) => {
  // Assuming you have a secret key for JWT
  const secretKey = "your-secret-key";

  // Customize the token payload based on your needs
  const payload = {
    userId: user.ID,
    username: user.name,
    // Add other relevant information
  };

  // Generate and return the token
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ where: { name: username } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, generate a JWT token
      const token = generateToken(user);

      // Send the token in the response
      res.json({ token });
    } else {
      // Passwords do not match
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};

// Other authentication-related functions can be added here

module.exports = {
  login,
};
