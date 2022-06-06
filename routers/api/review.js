const router = require('express').Router();
const passport = require('passport')
// Review models
const Review = require("../../models/Review")
const ReviewValidation = require('../../validation/review')

//Add Review
router.post("/addreview", (req, res) => {
  const { errors, isValid } = ReviewValidation(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newCase = new Review({
    client: req.body.client,
    lawyer: req.body.lawyer,
    title: req.body.title,
    description: req.body.description,
    ratings: req.body.ratings,
  });
  newCase
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

//---------------Lawyer's Payment requests list------------//
router.get(`/getMyReviews/:name`, async (req, res) => {
  const name = req.params.name;
  const reviews = await Review.find({ client: name })
  if (!reviews) {
    res.status(500).json({ success: false })
  }
  res.send(reviews);
})
//---------------Reviews about Lawyer------------//
router.get(`/getLawyerReviews/:name`, async (req, res) => {
  const name = req.params.name;
  const reviews = await Review.find({ lawyer: name })
  if (!reviews) {
    res.status(500).json({ success: false })
  }
  res.send(reviews);
})
// Delete a Review.
router.delete(`/DeleteMyReview/:_id`, async (req, res) => {
  const _id = req.params._id;
  const review = await Review.findByIdAndDelete({ _id: _id })
  if (!review) {
    res.status(500).json({ success: false })
  }
  res.send(review);
})


module.exports = router;
