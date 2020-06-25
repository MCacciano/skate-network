const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');

// we use dotenv to bring in our environment variables from config/.config.env
dotenv.config({ path: './config/.config.env' });

// import routes
const exampleRouter = require('./routes/example');

// initialize express app
const app = express();

// dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/example', exampleRouter);

// get PORT from .config.env but default to 5000 if .config.env doesn't exist
const PORT = process.env.PORT || 5000;

// init the server and store it in a variable so we can handle unhandledRejection errors
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode at: http://localhost:${PORT}`
      .green.bold.underline
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.italic.bold);
  // close server & exit process
  server.close(() => process.exit(1));
});
