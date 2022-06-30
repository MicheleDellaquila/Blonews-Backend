const { Schema, model, Types } = require('mongoose');

const wishlistModel = new Schema(
  {
    id: {
      type: Types.ObjectId,
    },
    userId: {
      type: String,
      required: true,
    },
    articleId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const wishlistModelSchema = model('wishlist', wishlistModel, 'Wishlist');
module.exports = wishlistModelSchema;
