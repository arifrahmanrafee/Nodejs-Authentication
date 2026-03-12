const express = require('express');
const muControl = require('../controller/music.controller');
const multer = require('multer');
const router = express.Router();
const middleware = require('../middleware/auth.middleware');

const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
// });
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'audio/mpeg', // mp3
      'audio/wav',
      'audio/ogg',
      'audio/mp4',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  },
});

router.post(
  '/upload',
  middleware.authArtist,
  upload.single('image'),
  muControl.uploadMus,
);
router.post('/create/album', middleware.authArtist, muControl.createAlbum);

router.get('/', middleware.authVerify, muControl.getAllMusic);
router.get('/albumList', middleware.authVerify, muControl.getAllAlbums);

router.get('/albums/:albumId', middleware.authVerify, muControl.getAlbumsById);




module.exports = router;
