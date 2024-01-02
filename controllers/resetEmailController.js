const UserModel = require("../models/UserModel");

const resetEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Mandatory data missing");
    }

    const user = await UserModel.findOne({
      where: { email: email, password: password },
    });

    if (!user) {
      return res.status(404).send("User does not exist");
    } else {
      await user.update({
        email: email,
      });

      return res.json("Email changed successfully");
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};

module.exports = {
  resetEmail,
};
