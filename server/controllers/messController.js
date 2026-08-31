const Mess = require("../models/Mess");
const User = require("../models/User");
const { hasAccess } = require("../utils/hasAccess");

exports.getAllMess = async (req, res) => {
  try {
    const { category, gender, budget } = req.query;
    const filter = { status: "approved" };
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
      const unlocked = hasAccess(user, mess);
      const base = {
        _id: mess._id,
        category: mess.category,
        gender: mess.gender,
        budget: mess.budget,
        image: mess.image,
        isFreeSample: mess.isFreeSample,
        unlocked,
      };
      if (unlocked) {
        base.name = mess.name;
        base.address = mess.address;
        base.contact = mess.contact;
        base.description = mess.description;
        base.fullImages = mess.fullImages;
      }

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
    const unlocked = hasAccess(user, mess);
    const base = {
      _id: mess._id,
      category: mess.category,
      gender: mess.gender,
      budget: mess.budget,
      image: mess.image,
      isFreeSample: mess.isFreeSample,
      unlocked,
    };
    if (unlocked) {
      base.name = mess.name;
      base.address = mess.address;
      base.contact = mess.contact;
      base.description = mess.description;
      base.fullImages = mess.fullImages;
    }
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
    if (req.body.isFreeSample && freeSampleCount >= 20) {
      return res.status(400).json({
        message: "Only 20 free-sample mess allowed",
      });
    }
    const mess = await Mess.create({ ...req.body, status: "approved" });
    res.status(201).json(mess);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addOwnerMess = async (req, res) => {
  try {
    const mess = await Mess.create({
      ...req.body,
      status: "pending",
      owner: req.userId,
    });
    res.status(201).json(mess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyMess = async (req, res) => {
  try {
    const messes = await Mess.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMessAdmin = async (req, res) => {
  try {
    const messes = await Mess.find().sort({ createdAt: -1 });
    res.status(200).json(messes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Mess remove successfully!",
      mess,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Mess updated successfully!",
      mess
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
