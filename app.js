const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
<<<<<<< HEAD
const resetPasswordRoute = require("./routes/resetPasswordRoute.js");
const resetEmailRoute = require("./routes/reseteEmailRoute.js");
=======
>>>>>>> b44c1a857267bf35ec04f2f8894a97d33335bb5a

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

<<<<<<< HEAD
// route Felipe Blaksley Reset Password
app.set("view engine", "ejs");
app.use("/api", resetPasswordRoute);
app.use("/api", resetEmailRoute);
// ------------------------------------------------------------

// Handle 404 errors
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
=======
app.get("/", (req, res) => {
>>>>>>> b44c1a857267bf35ec04f2f8894a97d33335bb5a
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
