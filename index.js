require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/dbConnectionConfig.js');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./config/corsConfig.js'));
app.use(require('./config/sessionConfig.js'));

app.use(require('./middleware/conditionalTokenValidation.js'));

app.use(require('./routes/mainRoute.js'));
app.use('/api', require('./routes/userRoute.js'));
app.use('/api', require('./routes/projectRoute.js'));
app.use('/api', require('./routes/memberRoute.js'));

app.use(require('./middleware/errorHandler.js'));

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
