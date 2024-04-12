const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI ||
      'mongodb+srv://darielvavila:zBfQYoLDo7XHAPmB@pisara.k0fhfeo.mongodb.net/?retryWrites=true&w=majority&appName=Pisara';
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`Database Connected: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDb;
