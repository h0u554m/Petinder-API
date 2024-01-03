const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserModel");
const { PASSNODEMAILER, JWT_SECRET_RESET_PASSWORD } = require("../config");

const postResetPassword = async (req, res) => {
  try {
    // Verify that the email has been sent
    const { email } = req.body;

    if (!email) {
      res.status(404).send("Send user email");
    } else {
      // find user by email if user not exist send message if not send email to reset password
      const user = await UserModel.findOne({
        where: { email: email },
      });
      if (!user) {
        res.status(404).send("User does not exists");
      } else {
        const secret = `${JWT_SECRET_RESET_PASSWORD} ${user.password}`;
        const token = jwt.sign({ email: user.email, id: user.id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:3000/api/reset-password/${user.id}/${token}`;

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "pipe.blaksley@gmail.com",
            pass: PASSNODEMAILER,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        var mailOptions = {
          from: "pipe.blaksley@gmail.com",
          to: user.email,
          subject: "Password Reset ¨Petinder",
          text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(404).send("Error sending email: " + error);
          } else {
            res
              .status(202)
              .send(
                "An email has been sent to reset the password" + info.response
              );
          }
        });
      }
    }
  } catch (error) {
    res.status(500).send("Server internal error: " + error);
  }
};

const getResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    var number = Number(id);
    //Verified that user exist
    const user = await UserModel.findOne({
      where: { id: number },
    });

    if (!user) {
      res.status(404).send("User does not exists");
    } else {
      const secret = `${JWT_SECRET_RESET_PASSWORD} ${user.password}`;
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, id: id, token: token });
    }
  } catch (error) {
    res.status(500).send("Server internal error: " + error);
  }
};

const postResetPasswordEmail = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json("Complete all fields");
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json("Password and confirmPassword are not the same");
    }

    const userId = Number(id);
    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(404).json("User does not exist");
    }

    const decodedToken = jwt.verify(token, JWT_SECRET_RESET_PASSWORD);

    // Check token validity
    if (decodedToken.userId !== userId) {
      return res.status(401).json("Unauthorized token");
    }

    // Update password (consider hashing/encrypting before saving)
    await user.update({
      password: password,
    });

    return res.json("Password changed successfully");
  } catch (error) {
    return res.status(500).json("Server internal error: " + error.message);
  }
};

module.exports = {
  postResetPassword,
  getResetPassword,
  postResetPasswordEmail,
};
