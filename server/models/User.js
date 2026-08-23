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
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
    subscription: [subscriptionSchema],
  },
  { timestamps: true },
);

const userModel = model("user", userSchema);

module.exports = userModel;
