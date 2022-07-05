const fs = require('fs');

const deleteFile = (file) => {
  fs.unlink(`${process.env.PATH__FILE}${file.folder}/${file.name}`, (err) => {
    if (err) {
      return err;
    }
  });
};

module.exports = deleteFile;
