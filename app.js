const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const resetPasswordRoute = require("./routes/resetPasswordRoute.js");
const resetEmailRoute = require("./routes/reseteEmailRoute.js");

// Create Express App
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// route Felipe Blaksley Reset Password
app.set("view engine", "ejs");
app.use("/", resetPasswordRoute);
app.use("/", resetEmailRoute);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Swagger Configuration
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Petinder - API",
      version: "1.0.0",
      description: "Petinder Online API",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Petinder API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Set up your routes
const indexRoute = require("./routes/index");

app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.json({
    Api: {
      message: "Petinder  - API Online",
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
