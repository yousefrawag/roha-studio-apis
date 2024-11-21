const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const roleSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, unique: true, required: true },
  permissions: [{ type: String }],
});

roleSchema.plugin(autoIncrement, { id: "roleID", inc_field: "_id" });

module.exports = mongoose.model("roles", roleSchema);

