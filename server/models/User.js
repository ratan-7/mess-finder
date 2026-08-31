const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["category", "full"],
      required: true,
    },
    category: {
      type: String,
    },
    purchaseAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    googleId: {
      type: String,
      required: true,
      unique: true,
    },

    profilePicture: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["student", "mess_owner"],
      default: "student",
    },
    subscription: [subscriptionSchema],
  },
  { timestamps: true },
);

const userModel = model("user", userSchema);

module.exports = userModel;
