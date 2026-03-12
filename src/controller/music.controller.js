const musicModel = require('../model/music.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const imagekit = require('../services/imagekit');
const albumModel = require('../model/album.model');
//middleware
const middleware = require('../middleware/auth.middleware');

async function uploadMus(req, res) {
  const { title } = req.body;
  const file = req.file;
  //ImagaKit for image url
  const result = await imagekit.upload({
    file: file.buffer.toString('base64'),
    fileName: file.originalname,
    folder: 'musicCover',
  });

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.mid.id,
  });

  res.status(201).json({
    message: 'music created successfully ',
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

/**
 * Functionalities for Album Creation
 */
async function createAlbum(req, res) {
  const { title, musics } = req.body;
  const album = await albumModel.create({
    title,
    artist: req.mid.id,
    musics: musics,
  });
  res.status(201).json({
    message: 'Album created successfully',
    album: {
      id: album.id,
      title: album.title,
      artists: album.artists,
      musics: album.musics,
    },
  });
}

async function getAllMusic(req, res) {
  const music = await musicModel.find().populate('artist', 'username email');

  res.status(200).json({
    message: 'Music fetched successfully',
    musics: music,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumModel.find().populate('musics');

  res.status(201).json({
    message: 'All albums fetched',
    albums: albums,
  });
}

async function getAlbumsById(req, res) {
  const id = req.params.albumId;
  console.log('🚀 ~ :77 ~ getAlbumsById ~ id:', id);

  const album = await albumModel
    .findById(id)
    .populate('artist', 'username email')
    .populate('musics');

  return res.status(201).json({
    message: 'Album fetched successfully',
    album: album,
  });
}

module.exports = {
  uploadMus,
  createAlbum,
  getAllMusic,
  getAllAlbums,
  getAlbumsById,
};
