const { json } = require("express");
const dbPool = require("../../../../student/src/model/db");

module.exports.postQuestion = async (req, res) => {
  try {
    const { problem, name } = req.body;
    const query = `INSERT INTO questions(problem) VALUES(?)`;

    const [result] = await dbPool.execute(query, [problem]);

    if (!result) {
      res.status(400).json({
        message: "ERR",
      });
    }
    res.status(201).json({
      message: "Posted Successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
