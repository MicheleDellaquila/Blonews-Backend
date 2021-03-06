const initializeDB = require('../config');
const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const newsApi = require('./utils/newsApi');
const getArticlesHome = require('./api/routers/articles/getArticlesHome');
const getArticles = require('./api/routers/articles/getArticles');
const getArticle = require('./api/routers/articles/getArticle');
const viewArticle = require('./api/routers/articles/viewArticle');
const getTopic = require('./api/routers/category/getTopic');
const getMostNews = require('./api/routers/category/getMostNew');
const getPopular = require('./api/routers/category/getPopular');
const getCategoryNews = require('./api/routers/category/getCategoryNews');
const createComment = require('./api/routers/comments/createComment');
const responseComment = require('./api/routers/comments/responseComment');
const getWishlist = require('./api/routers/wishlist/getWishlist');
const saveWishlist = require('./api/routers/wishlist/saveWishlist');
const deleteWishlist = require('./api/routers/wishlist/deleteWishlist');
const signUp = require('./api/routers/auth/signUp');
const login = require('./api/routers/auth/login');
const path = require('path');
require('dotenv').config();

// initializeDB
const start = async () => {
  try {
    const connection = await initializeDB();

    // utility middleware
    connection.use(express.urlencoded({ extended: true }));
    connection.use(express.json());
    connection.use('/uploads', express.static(path.join('uploads/')));
    connection.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );

    // save articles from news api each day at 24:00
    schedule.scheduleJob('0 0 * * *', async () => {
      newsApi();
    });

    // API
    // Articles
    connection.use(getArticles);
    connection.use(getArticlesHome);
    connection.use(getArticle);
    connection.use(viewArticle);

    // Category
    connection.use(getCategoryNews);
    connection.use(getTopic);
    connection.use(getMostNews);
    connection.use(getPopular);

    // Comment
    connection.use(createComment);
    connection.use(responseComment);

    // Wishlist
    connection.use(getWishlist);
    connection.use(saveWishlist);
    connection.use(deleteWishlist);

    // AUTH
    connection.use(signUp);
    connection.use(login);
  } catch (e) {
    console.log(e);
  }
};

start();
