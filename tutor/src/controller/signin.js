const dbPool = require("../../src/model/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signinTutor = async (req, res) => {
  try {
    // fetch email and password from 'req'
    const { email, password } = req.body;

    // check for student record in db
    const [existingStudent] = await dbPool.execute(
      "SELECT * FROM tutors WHERE email = ?",
      [email]
    );

    // if student record exists:
    if (existingStudent.length > 0) {
      // check if email is not verified
      if (existingStudent[0].email_verified === 0) {
        return res
          .status(400)
          .json({ status: false, message: "Kindly verify your email" });
      }

      // get the hashedPassword from the student's array and compare with the entered password
      const hashedPassword = existingStudent[0].password;
      const isPassword = await bcrypt.compare(password, hashedPassword);

      if (!isPassword) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Email/Password" });
      }

      // if passwords match, create a jwt token
      const token = jwt.sign({ email }, "process.env.JWT_SECRET", {
        expiresIn: "1h",
      });

      res.status(200).json({
        status: true,
        message: "Successfully logged in",
        token,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Sorry. We could not find your account",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Error. Internal Server Error" });
  }
};
