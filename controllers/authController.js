const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel"); // Assuming your Sequelize model is named 'User'
const refreshTokens = [];

const generateTokens = (user) => {
  const secretKey = "Petinder";
  const accessTokenPayload = {
    userId: user.ID,
    email: user.email,
    // Add other relevant information
  };
  const refreshTokenPayload = {
    userId: user.ID,
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
  const { email, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ where: { email: email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    true;

    if (passwordMatch) {
      // Passwords match, generate a JWT token
      const { accessToken, refreshToken } = generateTokens(user);

      // Send the token in the response
      res.json({ accessToken, refreshToken });
      refreshTokens.push(refreshToken);
    } else {
      // Passwords do not match
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { fullName, password, email } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await UserModel.findOne({ where: { email } });
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
      password: hashedPassword,
      email,
      name: fullName,
    });

    // Generate a JWT token
    const { accessToken, refreshToken } = generateTokens(newUser);

    // Send the tokens in the response
    res.json({ accessToken, refreshToken });
    refreshTokens.push(refreshToken);
  } catch (error) {
    next(error);
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  // Check if refresh token is valid (you should validate it against your database)
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  // In a real application, you might want to generate a new access token and send it back
  // Here, we are simply reusing the existing access token for simplicity
  const accessToken = jwt.sign(
    { userId: req.user.ID, email: req.user.email },
    secretKey,
    {
      expiresIn: "15m", // You can adjust the expiration time as needed
    }
  );

  res.json({ token: accessToken });
};

module.exports = {
  login,
  register,
  refreshToken,
};
