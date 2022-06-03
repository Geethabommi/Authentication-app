const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {
  name: 'development',
  asset_path: './assets',
  session_cookie_key: 'HVZVge7QAC4l4q6WnE8opHyEG0GF8pKU',
  db: 'authentication_app_system',
  mongodb_uri: `mongodb://localhost/`,
  EMAIL: 'geethadeveloper1@gmail.com',
  REFRESH_TOKEN: 'XXXXX', //give oauth refresh token
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_APP_SMTP_AUTH__USER,
      pass: process.env.AUTH_APP_SMTP_AUTH_PASS,
    },
  },
  google_client_id: 'XXXopt.apps.googleusercontent.com', //give google client id
  google_client_secret: 'xxxxx', //give google client secret
  google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
  appurl: 'http://localhost:8000',
};

const production = {
  name: 'production',
  asset_path: process.env.AUTH_APP_ASSET_PATH,
  session_cookie_key: process.env.AUTH_APP_SESSION_COOKIE_KEY,
  db: process.env.AUTH_APP_DB,
  mongodb_uri: process.env.MONGODB_URI,
  EMAIL: process.env.EMAIL,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_APP_SMTP_AUTH__USER,
      pass: process.env.AUTH_APP_SMTP_AUTH_PASS,
    },
  },

  google_client_id: process.env.AUTH_APP_GOOGLE_CLIENT_ID,

  google_client_secret: process.env.AUTH_APP_GOOGLE_CLIENT_SECRET,
  google_call_back_url:
    'https://authentication-app-gee.herokuapp.com/users/auth/google/callback',
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
  appurl: process.env.APP_URL,
};

module.exports =
  eval(process.env.AUTH_APP_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.AUTH_APP_ENVIRONMENT);
