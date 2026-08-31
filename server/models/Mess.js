const { Schema, model } = require("mongoose");

const messSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "any"],
      default: "any",
    },
    budget: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    description: {
      type: String,
    },
    fullImages: [
      {
        type: String,
      },
    ],

    isFreeSample: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["approved", "pending", "reject"],
      default: "pending",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true },
);

const messModel = model("mess", messSchema);
module.exports = messModel;
