const dbPool = require("../../src/model/db");

module.exports.getTutorSolution_get = async (req, res) => {
  try {
    const query = "SELECT * FROM tutors";

    const [result] = await dbPool.execute(query);
    if (!result) {
      res.status(400).json({
        message: "Error",
      });
    }
    return res.status(200).json({
      message: "Successfull!",
      result,
    });
  } catch (error) {
    console.log(error);
  }

  // res.send("HELLO THIS IS MY HOMEWORK SOLVER API");
};
