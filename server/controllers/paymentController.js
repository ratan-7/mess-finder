const dotenv = require("dotenv");
dotenv.config();
const Payment = require("../models/Payment");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const User = require("../models/User");
const PLANS = require("../config/plans");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { planType, category } = req.body;
    const plan = PLANS[planType];

    if (!plan) {
      return res.status(400).json({ message: "Invalid plan type" });
    }
    if (planType === "category" && !category) {
      return res
        .status(400)
        .json({ message: "Category required for this plan" });
    }

    const order = await razorpay.orders.create({
      amount: plan.price * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    await Payment.create({
      user: req.userId,
      planType,
      category: category || undefined,
      amount: plan.price,
      razorpayOrderId: order.id,
      status: "created",
    });

    res.status(200).json({ order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { razorpayPaymentId: razorpay_payment_id, status: "success" },
      { new: true },
    );
    if (!payment) {
      return res.status(404).json({ message: "Order not found" });
    }

    const plan = PLANS[payment.planType];
    const expiresAt = plan.durationDays
      ? new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000)
      : null;

    await User.findByIdAndUpdate(req.userId, {
      $push: {
        subscriptions: {
          type: payment.planType,
          category: payment.category,
          purchasedAt: new Date(),
          expiresAt,
        },
      },
    });

    res.status(200).json({ message: "Payment verified, access granted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
