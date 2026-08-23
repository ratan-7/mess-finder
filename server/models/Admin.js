const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const adminModel = model("admin", adminSchema);

module.exports = adminModel;
