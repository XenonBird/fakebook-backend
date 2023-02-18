const express = require('express');
const app = express();

// Route for the app's index page
app.get('/', (req, res) => {
  res.send('Welcome to the Fakebook app!');
});

module.exports = app;
