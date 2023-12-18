const resetEmail = async (req, res) => {
  try {
    const { email, password, id } = req.body;
    if (!email || !password || !id) {
      res.status(404).send("Mandatory data missing " + req.body);
    } else {
      const [result] = await pool.query(
        `UPDATE users SET email = IFNULL(?, email), password = IFNULL(?, password)
               WHERE id = ?`,
        [email, password, id]
      );
      if (result.affectedRows > 0) {
        res.status(202).send("Modified email");
      } else {
        res.status(404).send("User email does not exist");
      }
    }
  } catch (error) {
    res.status(404).send("Internal Server Error :" + error);
  }
};

module.exports = {
  resetEmail,
};
