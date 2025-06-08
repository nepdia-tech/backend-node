const mongoose = require('mongoose');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'local'}`
});

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PARAMS } = process.env;

  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_PARAMS}`;

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;
