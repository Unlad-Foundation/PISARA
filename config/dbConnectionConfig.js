const mongoose = require('mongoose');
const { constants } = require('./constantsConfig');

const connectDb = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || constants.DB.URI;
    if (!MONGODB_URI) throw new Error(constants.ERROR.MONGODB_NOT_DEFINE);
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(
      `${constants.SUCCESS.DATABASE} ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (error) {
    console.error(constants.ERROR.CONNECTION_FAILED, error);
    process.exit(1);
  }
};

module.exports = connectDb;
