const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const cleanedToken = token.replace(/^Bearer\s/, "");

    // Verify the token
    const decoded = jwt.verify(cleanedToken, "Petinder"); // Replace 'your_secret_key' with your actual secret key

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = jwtMiddleware;
