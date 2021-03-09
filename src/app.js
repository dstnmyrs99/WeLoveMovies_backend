/* eslint-disable strict */
require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require('./movies/moviesRouter');
const reviewsRouter = require('./reviews/reviewsRouter');
const theatersRouter = require('./theaters/theatersRouter');
const cors= require('cors');

app.use(cors());
app.use(express.json());
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

// Not found handler
app.use((request, response, next) => {
  next({ status: 404, message: `Not found: ${request.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
