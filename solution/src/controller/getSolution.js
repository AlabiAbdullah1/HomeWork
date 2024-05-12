const dbPool = require("../../../tutor/src/model/db");

module.exports.getQuestionSolution = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT solution FROM questions WHERE id=?`;
    // const query = `SELECT * FROM questions`;
    const [result] = await dbPool.execute(query, [id]);

    if (!result || result.length < 0) {
      res.staus(400).json({
        status: false,
        message: `Question with id ${id} not found!`,
      });
    }
    return res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
