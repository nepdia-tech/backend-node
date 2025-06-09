const connectDB = require('./config/db');
const express = require('express');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'local'}`
});
const PORT = process.env.PORT || 3000;
let app = express();

app.get('/manoj', (req, res) => {
  let data = req.query.name;
  console.log('got: ', data)
  res.send(data);
});

(async () => {
  try {
    const db = await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    const users = await db.collection('user').find({}).toArray();
  } catch (error) {
    console.error('Server failed to start:', error);
  }
})();
