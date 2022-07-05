const { Schema, Types } = require('mongoose');

const commentSchema = new Schema(
  {
    id: {
      type: Types.ObjectId,
    },
    idUser: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    response: {
      type: Object
    },
  },
  { versionKey: false },
);

module.exports = commentSchema;
