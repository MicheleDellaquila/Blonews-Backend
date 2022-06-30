const { Schema, model, Types } = require('mongoose');

const usersModel = new Schema(
  {
    id: {
      type: Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    editorialBoard: {
      type: String,
    },
  },
  { versionKey: false },
);

usersModelSchema = model('users', usersModel, 'Users');
module.exports = usersModelSchema;
