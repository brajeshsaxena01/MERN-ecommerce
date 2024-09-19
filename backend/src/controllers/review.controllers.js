const express = require("express");
const Review = require("../models/review.models");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id })
      //   .populate("productId")
      .populate("userId", "email")
      .exec();
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/:id", authenticate, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const isReviewPresentForTheProductByTheUser = await Review.findOne({
      productId: productId,
      userId: userId,
    });
    console.log("isReviewPresent", isReviewPresentForTheProductByTheUser);
    if (isReviewPresentForTheProductByTheUser) {
      return res
        .status(409)
        .send({ message: "You already rated the product!" });
    }
    const review = await Review.create({
      ...req.body,
      userId: userId,
      productId,
    });
    const populatedReview = await review.populate("userId", "email");
    //   .populate("productId")
    return res.status(200).send(populatedReview);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
