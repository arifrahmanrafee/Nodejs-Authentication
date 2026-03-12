const express = require('express');
const Acontroller = require('../controller/auth.controller');

const router = express.Router();

router.post('/register', Acontroller.reguser);
router.post('/login', Acontroller.logUser);

//logout
router.post('/logout', Acontroller.logoutUser);

module.exports = router;
