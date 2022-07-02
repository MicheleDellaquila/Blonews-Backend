const initializeDB = require('../config');
const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const clearNews = require('./utils/clearNews');
const newsApi = require('./utils/newsApi');
const getArticles = require('./api/routers/articles/getArticles');
const getArticle = require('./api/routers/articles/getArticle');
const getTopic = require('./api/routers/category/getTopic');
const getMostNews = require('./api/routers/category/getMostNew');
const getPopular = require('./api/routers/category/getPopular');
const getComments = require('./api/routers/category/getMostComments');
const getWishlist = require('./api/routers/wishlist/getWishlist');
require('dotenv').config();

// initializeDB
const start = async () => {
  try {
    const connection = await initializeDB();

    // utility middleware
    connection.use(express.urlencoded({ extended: true }));
    connection.use(express.json());
    connection.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );

    // save articles from news api each day at 24:00
    schedule.scheduleJob('0 0 * * *', async () => {
      newsApi();
      clearNews();
    });

    // API
    // Articles
    connection.use(getArticles);
    connection.use(getArticle);

    // Category
    connection.use(getTopic);
    connection.use(getMostNews);
    connection.use(getPopular);
    connection.use(getComments);

    // Wishlist
    connection.use(getWishlist);
  } catch (e) {
    console.log(e);
  }
};

start();
