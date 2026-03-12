const app = require('./src/app');
require('dotenv').config();

const connectDB = require('./src/db/db');

app.listen(3000, () => {
  console.log('Server is running at port no 3000');
});
connectDB();
