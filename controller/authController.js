const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.login = (req, res, next) => {
  userSchema
    .findOne({ email: req.body.email })
    .populate("role")
    .then((user) => {
      if (!user) throw new Error("User doesn't exist");
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (!result) throw new Error("Invalid Password");
          let token = jwt.sign(
            {
              id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.status(200).json({ action: "Authenticated", token, user });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `You requested a password reset. Use the following link to reset your password: 
        ${process.env.CLIENT_URL}/resetPassword/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Password reset link sent to your email", resetToken });
  } catch (error) {
    next(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userSchema.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userSchema.findByIdAndUpdate(decoded.id, {
      password: hashedPassword,
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
