const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const resetPasswordRoute = require("./routes/resetPasswordRoute.js");
const resetEmailRoute = require("./routes/reseteEmailRoute.js");

// Create Express App
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set up your routes
const indexRoute = require("./routes/index");

app.use("/", indexRoute);

// route Felipe Blaksley Reset Password
app.set("view engine", "ejs");
app.use("/api", resetPasswordRoute);
app.use("/api", resetEmailRoute);
// ------------------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    Api: {
      message: "Petinder API Online",
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
