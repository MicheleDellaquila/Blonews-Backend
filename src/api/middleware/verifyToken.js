const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization') || '';

  // check token
  try {
    const verified = jwt.verify(token.split(' ')[1], 'secret');

    // check token is valid
    if (verified) {
      next();
    }
  } catch (error) {
    return res.status(401).send({
      message: 'Non sei autorizzato. Sessione scaduta',
    });
  }
};

module.exports = verifyToken;
