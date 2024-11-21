const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    _id: Number,
    fullName: {
      type: String,
    },
    job: String,
    phoneNumber: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      ref: "roles",
    },
    imageURL: {
      type: String,
      default:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745",
    },
    imageID: String,
    type: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(autoIncrement, { id: "userID" });

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt
    .genSalt()
    .then((salt) => {
      return bcrypt.hash(this.password, salt);
    })
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});
module.exports = mongoose.model("users", userSchema);
