const dbPool = require("../../../../student/src/model/db");

module.exports.questions = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT problem FROM questions WHERE id=?`;
    const [result] = await dbPool.execute(query, [id]);
    // const query = `SELECT * FROM questions`;
    // const [result] = await dbPool.execute(query);

    if (!result) {
      res.status(400).json({
        message: "ERROR",
      });
    }
    res.status(200).json({
      message: result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
