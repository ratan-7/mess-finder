const Mess = require("../models/Mess");
const User = require("../models/User");

exports.getAllMess = async (req, res) => {
  try {
    const { category, gender, budget } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (budget) filter.budget = { $lte: Number(budget) };

    const messes = await Mess.find(filter);
    if (messes.length == 0) {
      return res.status(404).json({
        message: "mess not found",
      });
    }
    const user = req.userId ? await User.findById(req.userId) : null;

    const result = messes.map((mess) => {
      const base = {
        _id: mess._id,
        category: mess.category,
        gender: mess.gender,
        budget: mess.budget,
        image: mess.image,
        isFreeSample: mess.isFreeSample,
      };

      return base;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMessById = async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });

    const user = req.userId ? await User.findById(req.userId) : null;

    const base = {
      _id: mess._id,
      category: mess.category,
      gender: mess.gender,
      budget: mess.budget,
      image: mess.image,
      isFreeSample: mess.isFreeSample,
    };

    res.json(base);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addMess = async (req, res) => {
  try {
    const freeSampleCount = await Mess.countDocuments({ isFreeSample: true });
    if (req.body.isFreeSample && freeSampleCount >= 2) {
      return res.status(400).json({
        message: "Only 2 free-sample mess allowed",
      });
    }
    const mess = await Mess.create(req.body);
    res.status(201).json(mess);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
