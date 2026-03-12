const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB Connected Successfully');
  } catch (error) {
    console.error('DB Conncetion Failed', error);
  }
}
module.exports = connectDB;
