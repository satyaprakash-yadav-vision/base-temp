import nodemailer from 'nodemailer';
import { CONSTANT_CONFIG } from '../../../config/CONSTANT_CONFIG';

const smtpOptions: {} = CONSTANT_CONFIG.EMAIL.OPTIONS;

// server - smtp.aqtdirect.com
// username - notification
// pass - haiq xnfm dkwh nmdf
// port - 587

async function sendEmail(obj: { to?; cc?; subject; html; bcc?; from? }) {
  const transporter = nodemailer.createTransport(smtpOptions);

  transporter.sendMail(obj, function (error, info) {
    if (error) console.log(error);
    console.log('Email Sent Successfully');
    console.log(info);
  });
}

export { sendEmail };
