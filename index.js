const connectDB = require('./config/db');
const http = require('http');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'local'}`
});

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Server is running' }));
});

(async () => {
  try {
    const db = await connectDB();
    
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
    const users = await db.collection('user').find({}).toArray();
  } catch (error) {
    console.error('Server failed to start:', error);
  }
})();
