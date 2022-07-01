const express = require('express');
const mongoose = require('mongoose');

const initializeDB = async () => {
  const connection = express();

  // connecting to db
  mongoose
    .connect(
      `mongodb+srv://MicheleDellaquila:${process.env.DB__PASSWORD}@cluster0.c105c.mongodb.net/Blonews?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    .then(() => {
      console.log('connection successful');

      const port = 3001;
      connection.listen(port);
    })
    .catch((err) => {
      console.log('Error: ' + err);
    });

  return connection;
};

module.exports = initializeDB;
