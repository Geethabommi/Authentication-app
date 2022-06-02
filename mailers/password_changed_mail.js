const nodemailer = require('../config/nodemailer');

// module.exports.sendPasswordchangeUpdateMail = (user) => {
//   let htmlString = nodemailer.renderTemplate(
//     {
//       user: user,
//     },
//     '/password_changed_mail.ejs'
//   );

//   nodemailer.transporter.sendMail(
//     {
//       from: 'geethabommi139@gmail.com',
//       to: user.email,
//       subject: 'Password Change Activity',
//       html: htmlString,
//     },
//     (err, info) => {
//       if (err) {
//         console.log('error in sending password updated', err);
//         return;
//       }
//       console.log('mail delivered', info);
//       return;
//     }
//   );
// };

module.exports.sendPasswordchangeUpdateMail = async (user) => {
  let htmlString = nodemailer.renderTemplate(
    {
      user: user,
    },
    '/password_changed_mail.ejs'
  );
  let emailTransporter = await nodemailer.transporter();

  await emailTransporter.sendMail(
    {
      from: 'geethadeveloper1@gmail.com',
      to: user.email,
      subject: 'Password Change Activity',
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log('error in sending password updated', err);
        return;
      }
      console.log('mail delivered', info);
      return;
    }
  );
};
