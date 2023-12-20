const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

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
