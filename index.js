const connectDB = require('./config/db');

(async () => {
  const db = await connectDB();

  const users = await db.collection('user').find({}).toArray();
})();
