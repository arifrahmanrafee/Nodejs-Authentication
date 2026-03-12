const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(201).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRTES);

    if (decoded.role !== 'artist') {
      return res
        .status(403)
        .json({ message: 'you donot have access to create the music' });
    }

    req.mid = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Failed to create Album',
    });
  }
}

async function authVerify(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: ' Unauthorized',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRTES);
    if (decoded.role !== 'user') {
      res.status(401).json({
        message: 'You donot have access',
      });
    }
    req.mid = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: 'Unauthorized user',
    });
  }
}

module.exports = { authArtist, authVerify };
