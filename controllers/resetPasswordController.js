const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var JWT_SECRET = "heUmO87Kh1KK";
var user = {
  id: 1,
  email: "felipe.blaksley@hotmail.com",
  password: "12345678",
};

const postResetPassword = async (req, res) => {
  try {
    // Verify that the email has been sent
    const { email } = req.body;

    if (!email) {
      res.status(404).send("Send user email");
    } else {
      // find user by email if user not exist send message if not send email to reset password
      if (email !== user.email) {
        res.status(404).send("User does not exists");
      } else {
        const secret = `${JWT_SECRET} ${user.password}`;
        const token = jwt.sign({ email: user.email, id: user.id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:3000/api/reset-password/${user.id}/${token}`;

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "pipe.blaksley@gmail.com",
            pass: "jbbj bncp ynxb kgvs",
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

    if (number !== user.id) {
      res.status(404).send("User does not exists");
    } else {
      const secret = `${JWT_SECRET} ${user.password}`;
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
    //Verified that password and confirmPassword are the same
    if (password === "" || confirmPassword === "") {
      res.json("Complete all fields");
    } else if (password !== confirmPassword) {
      res.json("Password and confirmPassword are not the same");
    } else {
      var number = Number(id);
      //Verified that user exist

      if (number !== user.id) {
        res.status(404).send("User does not exists");
      } else {
        // take the new password an save it in the database
        const secret = `${JWT_SECRET} ${user.password}`;
        const verify = jwt.verify(token, secret);
        res.json("Verified");
      }
    }
  } catch (error) {
    res.status(500).send("Server internal error: " + error);
  }
};

module.exports = {
  postResetPassword,
  getResetPassword,
  postResetPasswordEmail,
};
