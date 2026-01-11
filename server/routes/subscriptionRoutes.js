const express = require("express");
const Subscription = require("../models/Subscription");
const Course = require("../models/Course");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Subscribe to a course
router.post("/subscribe", authMiddleware, async (req, res) => {
  const { courseId, promoCode } = req.body;
  const userId = req.user.userId;

  try {
    const course = await Course.findById(courseId);
    if (!course)
      return res.status(404).json({ message: "Course not found" });

    // Check if already subscribed
    const existing = await Subscription.findOne({ userId, courseId });
    if (existing)
      return res.status(400).json({ message: "Already subscribed" });

    let pricePaid = 0;

    if (course.price === 0) {
      pricePaid = 0;
    } else {
      // Paid course logic
      if (promoCode !== "BFSALE25") {
        return res.status(400).json({ message: "Invalid promo code" });
      }

      pricePaid = course.price / 2; // 50% discount
    }

    const subscription = await Subscription.create({
      userId,
      courseId,
      pricePaid,
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's subscribed courses
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.user.userId,
    }).populate("courseId");

    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
