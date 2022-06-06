const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/Dictionary");

// Load Lawyer model
const Dictionary = require("../../models/Dictionary");

router.post("/addLaws", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
      const newCase = new Dictionary({
        title: req.body.title,
        letter: req.body.letter,
        permalink: req.body.permalink,
        body: req.body.body,
        published_at: req.body.published_at,
        source: req.body.source,
        name: req.body.name,
      });
      newCase
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

//---------------Lawyer's Added Laws------------//
router.get(`/getMyLaws/:name`, async (req, res) => {
  const name = req.params.name;
  const cases = await Dictionary.find({ name: name })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})

//---------------Lawyer's Added Laws------------//
router.get(`/SearchLaws/:value`, async (req, res) => {
  const value = req.params.value;
  const finalLaw = await Dictionary.find({$or:[{ title: value},{ letter: value} ]})
//  const finalLaw= await laws.find({name:""})
  if (!finalLaw) {
    res.status(500).json({ success: false })
  }
  res.send(finalLaw);
})


//---------------Normal builtin Laws------------//
router.get(`/getLaws/`, async (req, res) => {
  const cases = await Dictionary.find({ name:""})
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})



// DELETE 
// Delete a Added Law.
router.delete(`/deleteLaw/:_id`, async (req, res) => {
  const _id = req.params._id;
  const cases = await Dictionary.findByIdAndDelete({ _id: _id })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})
module.exports = router;
