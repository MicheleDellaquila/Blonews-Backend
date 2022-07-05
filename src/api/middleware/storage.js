const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

//Generic file storage
const Storage = multer({
  limits: {
    fieldSize: 50000,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.env.PATH__FILE}${req.header('Upload')}`);
    },
    filename: (req, file, cb) => {
      const mimeType = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + mimeType);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    cb(null, isValid);
  },
});

module.exports = Storage;
