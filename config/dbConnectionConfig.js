const mongoose = require('mongoose');
const { constants } = require('./constantsConfig');

const connectDb = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || constants.DB.URI;
    if (!MONGODB_URI) throw new Error(constants.ERRORS.MONGODB_NOT_DEFINE);
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`Database Connected: ${connect.connection.host}, ${connect.connection.name}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDb;
