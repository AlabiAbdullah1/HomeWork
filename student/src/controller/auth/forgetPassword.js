const randomize = require("randomatic");
const nodeMailer = require("nodemailer");
const dbPool = require("../../model/db");

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //check if email exists in student table
    const [existingEmail] = await dbPool.execute(
      "SELECT email FROM students WHERE email = ?",
      [email]
    );

    if (existingEmail.length < 1) {
      res.status(400).json({
        message: "email doesn't exist",
      });
    } else {
      //create random resetToken and save to database
      const resetToken = randomize("A0a0", 40);

      const query = `INSERT INTO students (reset_token) VALUES (?)`;
      const [results] = await dbPool.execute(query, [resetToken]);
    }

    //send email /resetpassword/{token}/{email}
    const transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_SERVICE_PROVIDER,
      port: process.env.SERVICE_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const sendEmail = async (recipientEmail, resetToken) => {
      const resetLink = `/resetPassword/${resetToken}/${recipientEmail}`;

      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: recipientEmail,
          subject: "Password Reset",
          text: `CLick on this link to reset your password: ${resetLink}`,
          html: `<p>CLick on this link to reset your password: <a href="${resetLink}">Reset Link</a></p>`,
        });
        console.log(`Message sent: ${info.messageId}`);
      } catch (error) {
        console.error(error);
      }
    };
    sendEmail(email, resetToken);

    res.status(200).json({
      status: success,
      message: "reset link sent successfully",
    });
  } catch (error) {
    console.error(error);
  }
};
