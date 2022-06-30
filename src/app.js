const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// active express
const app = express();

// connecting to db
mongoose
  .connect(
    `mongodb+srv://MicheleDellaquila:${process.env.DB__PASSWORD}@cluster0.c105c.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('connection successful');

    const port = 3001;
    app.listen(port);
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

// utility middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// save articles each day at 24:00
schedule.scheduleJob('0 0 * * *', async () => {
  const response = await axios({
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?country=${process.env.NEWS__LANGUAGE}&apiKey=${process.env.NEWS__ITA_KEY}`,
    data: null,
  });

  // check responses 0 has success of failure
  if (response.status !== 200) {
    console.log('It is not possible to save articles');
    return;
  }

  // create new articles and save them
  const newArticles = response.data.articles.map((article) => {
    return {
      editorialBoard: article.source.name,
      author: article.author,
      title: article.title,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      description: article.description,
      content: article.content,
      category: article.category || 'notizie--generali',
      externalUrlArticle: article.url,
    };
  });
  const articles = await articlesModelSchema.insertMany(newArticles);

  // check if articles has been save or not
  if (articles.length === 0) {
    console.log('It is not possible to save articles');
    return;
  }

  console.log('Articles saved');
  return;
});

// API
// Articles
app.use(getArticles);
app.use(getArticle);
app.use(getCategory);

// AUTH
app.use(signUp);
app.use(login);
app.use(resetPassword);

// WHISHLIST
app.use(getWishlist);
app.use(saveWishlist);
app.use(deleteWishlist);
