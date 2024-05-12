const dbPool = require("../../src/model/db");
const bcrypt = require("bcryptjs");
const randomize = require("randomatic");
const sendEmail2 = require("../../../utils/email");
require("dotenv").config();

exports.registerTutor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if the email  exists in students table
    const [existingStudent] = await dbPool.execute(
      "SELECT email FROM tutors WHERE email = ?",
      [email]
    );
    if (existingStudent.length > 0) {
      res.status(400).json({
        status: false,
        message: "email already exists",
      });
    } else {
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const verification_status = false;

      // generate a verification token
      const verificationToken = randomize("A0a0", 40);

      //save to database
      const query = `INSERT INTO tutors (email,  name, password, email_verified, verification_token) VALUES (?,?,?,?,?)`;
      const [results] = await dbPool.execute(query, [
        email,
        name,
        hashedPassword,
        verification_status,
        verificationToken,
      ]);

      if (!results) {
        res.status(400).json({
          status: false,
          message: "something went wrong",
        });
      }

      //send email /verify/{verification_token}

      sendEmail2(email, verificationToken);

      res.status(200).json({
        status: true,
        message: "successful",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
