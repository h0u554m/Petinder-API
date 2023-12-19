const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// Create Express App
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up your routes
/* const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

app.use('/', indexRoute);
app.use('/users', userRoute); */

// Handle 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.get("/",(req, res,)=>{
  res.json({
    Api: {
      message: "Petinder API Online",
    },
  });
})
// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
