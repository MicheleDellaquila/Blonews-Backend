const { Schema, model, Types } = require('mongoose');

const articlesSchema = new Schema(
  {
    id: {
      type: Types.ObjectId,
    },
    editorialBoard: {
      type: String,
    },
    author: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    urlToImage: {
      type: String,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    externalUrlArticle: {
      type: String,
    },
  },
  { versionKey: false },
);

articlesModelSchema = model('articles', articlesSchema, 'Articles');
module.exports = articlesModelSchema;
