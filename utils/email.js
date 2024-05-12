const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smpt.gmail.com",
  port: 465,
  // secure: true,
  auth: {
    user: "sikeabdulnig@gmail.com",
    pass: "fdyvlpfxuplojszd",
  },
});

// const transporter = nodeMailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   host: process.env.EMAIL_SERVICE_PROVIDER,
//   port: process.env.SERVICE_PORT,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

const sendEmail = async (recipientEmail, verificationToken) => {
  const verificationLink = `http://localhost:3000/student/verify/${verificationToken}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Email Verification",
      text: `Click on this link to verify your email: ${verificationLink}`,
      // html: `<p>Click on this link to verify your email: <a href="${verificationLink}">Verification Link</a></p>`,
    });
    console.log(verificationLink);
  } catch (error) {
    console.error(error);
  }
};

const sendEmail2 = async (recipientEmail, verificationToken) => {
  const verificationLink = `http://localhost:3000/tutor/verify/${verificationToken}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Email Verification",
      text: `Click on this link to verify your email: ${verificationLink}`,
      // html: `<p>Click on this link to verify your email: <a href="${verificationLink}">Verification Link</a></p>`,
    });
    console.log(`Message sent: ${info.messageId}`);
    console.log(verificationLink);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendEmail, sendEmail2 };
