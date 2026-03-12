const mongoose = require('mongoose');
const modelUser = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function reguser(req, res) {
  const { username, email, password, role = 'user' } = req.body;

  //findOne returns the whole object or whole data not just true or false

  const isUserAlreadyPresent = await modelUser.findOne({
    $or: [{ username }, { email }],
  });
  console.log(isUserAlreadyPresent);
  if (isUserAlreadyPresent) {
    return res.status(409).json({
      message: 'user alredy present',
    });
  }

  // Hashing the password
  const hash = await bcrypt.hash(password, 15);

  //Creating the Schema
  const user = await modelUser.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = await jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRTES,
  );

  res.cookie('token', token);
  res.status(201).json({
    message: 'User registered Successfully',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function logUser(req, res) {
  const { username, email, password } = req.body;
  //findOne returns the whole object or whole data not just true or false
  const user = await modelUser.findOne({
    $or: [{ username }, { email }],
  });
  console.log(user);
  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid Password',
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRTES,
  );
  res.cookie('token', token);
  res.status(201).json({
    message: 'Login succesfull',
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie('token');
  res.status(201).json({
    message: 'user logout successfully',
  });
}
module.exports = { reguser, logUser, logoutUser };
