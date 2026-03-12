const express = require('express');
const cookieParser = require('cookie-parser');
const routeAuth = require('../src/routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const multer = require('multer');

//Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/music', musicRoutes);
app.use('/api/auth', routeAuth);

module.exports = app;
