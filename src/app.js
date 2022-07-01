const initializeDB = require('../config');
const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const clearNews = require('./utils/clearNews');
const newsApi = require('./utils/newsApi');
const getArticles = require('./api/routers/articles/getArticles');
require('dotenv').config();

// initializeDB
const connection = initializeDB();

// utility middleware
connection.use?.(express.urlencoded({ extended: true }));
connection.use?.(express.json());
connection.use?.(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// save articles from news api each day at 24:00
schedule.scheduleJob('*/10 * * * * *', async () => {
  newsApi();
  clearNews();
});

// API
// Articles
connection.use(getArticles);
