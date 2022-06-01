const nodemailer = require('../config/nodemailer');

module.exports.sendResetPasswordMail = (user, resetaccessToken) => {
  let htmlString = nodemailer.renderTemplate(
    {
      user: user,
      accesstoken: resetaccessToken,
    },
    '/reset_password_mail.ejs'
  );

  nodemailer.transporter.sendMail(
    {
      from: 'geethabommi139@gmail.com',
      to: user.email,
      subject: 'Reset Password for Authentication App',
      html: htmlString,
    },

    (err, info) => {
      if (err) {
        console.log('Error in sending Reset password link', err);
        return;
      }
      console.log('Mail delivered', info);
      return;
    }
  );
};
