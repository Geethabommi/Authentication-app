const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const env = require('./environment');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

//created transport of SMTP of OAuth for nodemailer to send Mail
let renderTemplate = (data, relativePath) => {
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('error in rendering mail template', err);
        return;
      }
      mailHtml = template;
    }
  );
  return mailHtml;
};

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    env.google_client_id,
    env.google_client_secret,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: env.EMAIL,
      accessToken,
      clientId: env.google_client_id,
      clientSecret: env.google_client_secret,
      refreshToken: env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

module.exports = {
  transporter: createTransporter,
  renderTemplate: renderTemplate,
};
