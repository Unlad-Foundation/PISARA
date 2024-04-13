exports.constants = {
  PORT: 5000,

  APP: {
    NAME: 'UNLAD Template API',
  },

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

  ERROR: {
    MONGODB_NOT_DEFINE: 'MONGODB_URI is not defined in the environment variables.',
    CONNECTION_FAILED: 'Database connection failed:',
    UNEXPECTED: 'An unexpected error occurred. Please try again later.',

    USER: {
      NOT_AUTHORIZED: 'User is not authorized',
      NOT_FOUND: 'User not found',
      INVALID_CREDENTIALS: 'Invalid credentials',
      EMAIL_ALREADY_EXISTS: 'Email already exists',
      NO_ACCOUNT: 'No account found with this email. Please register.',
      INVALID_EMAIL: 'Invalid email format',
      REQUIRED_FIELDS: 'Both email and password are required.',
      ALREADY_EXIST: 'User already exists',
      UPDATE_FAILED: 'An error occurred during the update.',
    },

    PROJECT: {
      NOT_FOUND: 'Project not found',
      ALREADY_EXISTS: 'Project already exists',
      UPDATE_FAILED: 'An error occurred during the update.',
      REQUIRED_FIELDS: 'Please fill all fields',
      MEMBER_EXISTS: 'Member already exists in the project',
      MEMBER_NOT_FOUND: 'Member not found in the project',
    },
  },

  SUCCESS: {
    SERVER: 'Server running on port',
    DATABASE: 'Database connected:',

    USER: {
      REGISTER: 'User registered successfully',
      LOGIN: 'Login successful',
      UPDATE: 'Update successful',
      DELETE: 'Delete successful',
    },

    PROJECT: {
      CREATE: 'Project created successfully',
      UPDATE: 'Update successful',
      DELETE: 'Delete successful',
      DEACTIVATE: 'Member deactivated',
      ACTIVATE: 'Member activated',
    },
  },

  POPULATE: {
    PROJECT: {
      PATH: 'members.userId',
      SELECT: 'firstname lastname email role',
    },

    USER: {
      PATH: 'createdBy',
      SELECT: 'firstname lastname role',
    },
  },

  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
};
