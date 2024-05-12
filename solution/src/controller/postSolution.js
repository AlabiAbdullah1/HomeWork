const dbPool = require("../../../tutor/src/model/db");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports.postSolution = async (req, res) => {
  try {
    const answer = req.body.answer;
    const id = req.params.id;
    const query = `UPDATE questions SET solution=? WHERE id=?`;
    const [result] = await dbPool.execute(query, [answer, id]);

    if (!result) {
      res.status(400).json({
        status: false,
        message: "An error has occured",
      });
    }
    return res.status(201).json({
      status: true,
      message: "Solution posted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
