exports.constants = {
  PORT: 5000,
  DB: {
    URI: 'mongodb+srv://darielvavila:zBfQYoLDo7XHAPmB@pisara.k0fhfeo.mongodb.net/?retryWrites=true&w=majority&appName=Pisara',
  },
  STATUS: {
    VALIDATION_ERROR: {
      CODE: 400,
      TITLE: 'Validation Failed',
    },
    UNAUTHORIZED: {
      CODE: 401,
      TITLE: 'Unauthorized',
    },
    FORBIDDEN: {
      CODE: 403,
      TITLE: 'Forbidden',
    },
    NOT_FOUND: {
      CODE: 404,
      TITLE: 'Not Found',
    },
    SERVER_ERROR: {
      CODE: 500,
      TITLE: 'Server Error',
    },
  },
  ORIGIN: {
    // adjust this to your frontend URL
    URL: 'http://localhost:5173',
  },
  JWTCONFIG: {
    // adjust this to your secret key and expiration time
    SECRET: 'P!$@r@S3cr3t',
    EXPIRESIN: '1d',
    BEARER_REGEX: /^Bearer\s+(\S+)/,
  },
  ERRORS: {
    MONGODB_NOT_DEFINE: 'MONGODB_URI is not defined in the environment variables.',
  },
};
