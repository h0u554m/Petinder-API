const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const resetEmail = async (req, res) => {
  try {
    const { email, password, newEmail } = req.body;
    if (!email || !password || !newEmail) {
      return res.status(400).send("Mandatory data missing");
    }

    const user = await UserModel.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).send("User does not exist");
    }

    // Verificar la contraseña proporcionada con la contraseña almacenada usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    // Si la contraseña es válida, actualizar el correo electrónico del usuario
    await user.update({
      email: newEmail,
    });

    return res.json("Email changed successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};

module.exports = {
  resetEmail,
};
