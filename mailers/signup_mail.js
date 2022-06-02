const nodemailer = require('../config/nodemailer');

// exports.sendSignupWelcomeMail = (user) => {
//   let htmlString = nodemailer.renderTemplate(
//     { user: user },
//     '/signup_mail.ejs'
//   );

//   nodemailer.transporter.sendMail(
//     {
//       from: 'geethabommi139@gmail.com',
//       to: user.email,
//       subject: 'Welcome to Authenticatio App',
//       html: htmlString,
//     },

//     (err, info) => {
//       if (err) {
//         console.log('error in sending signup welcome mail', err);
//         return;
//       }
//       console.log('Mail delivered', info);
//     }
//   );
// };



exports.sendSignupWelcomeMail = (user) => {
  let htmlString = nodemailer.renderTemplate(
    { user: user },
    '/signup_mail.ejs'
  );

  let emailTransporter = await nodemailer.transporter();

  await emailTransporter.sendMail(
    {
      from: 'geethadeveloper1@gmail.com',
      to: user.email,
      subject: 'Welcome to Authenticatio App',
      html: htmlString,
    },

    (err, info) => {
      if (err) {
        console.log('error in sending signup welcome mail', err);
        return;
      }
      console.log('Mail delivered', info);
    }
  );
};
