const { Schema, model, Types } = require('mongoose');
const commentSchema = require('./commentModel');

const articleSchema = new Schema(
  {
    id: {
      type: Types.ObjectId,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
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
    views: {
      type: Number,
      min: 0,
    },
    comments: [commentSchema],
    publishedAt: {
      type: Date,
      required: true,
    },
    editorialBoard: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
  },
  { versionKey: false },
);

articleModelSchema = model('articles', articleSchema, 'Articles');
module.exports = articleModelSchema;
