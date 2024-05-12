const dbPool = require("../../../../student/src/model/db");

module.exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const query = `DELETE FROM questions WHERE id=?`;
    const [result] = await dbPool.execute(query, [id]);

    if (!result) {
      res.status(400).json({
        status: false,
        message: "Question with the ID provided is not found!",
      });
    }
    res.status(200).json({
      message: "Question Deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
