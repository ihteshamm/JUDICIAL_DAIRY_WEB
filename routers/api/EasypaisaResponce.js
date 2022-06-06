const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/EasypaisaResponce");

// Load Lawyer model
const EasypaisaResponce = require("../../models/EasypaisaResponce");

// @route POST api/lawyers/registers
// @desc Registers lawyers
// @access  Public
router.post("/addEasypaisaResponce", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const Responce = new EasypaisaResponce({
    requestID: req.body.requestID,
    lawyername: req.body.lawyername,
    transitionID: req.body.transitionID,
    date: req.body.date,
    clientEasypisaName: req.body.clientEasypisaName,
    clientEasypaisaNumber: req.body.clientEasypaisaNumber,
  });
  Responce
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

//---------------Lawyer's Payment requests list------------//
router.get(`/getEasypaisaResponce/:id`, async (req, res) => {
  const id = req.params.id;
  const Payments = await EasypaisaResponce.find({ requestID: id })
  if (!Payments) {
    res.status(500).json({ success: false })
  }
  res.send(Payments);
})


//---------------Client's Payments------------//
router.get(`/getPaymentRequestClient/:name`, async (req, res) => {
  const name = req.params.name;
  const Payments = await Payment.find({ client: name, status: "pending" })
  if (!Payments) {
    res.status(500).json({ success: false })
  }
  res.send(Payments);
})

// Delete a Case.
router.delete(`/deleteEasypaisaResponce/:_id`, async (req, res) => {
  const _id = req.params._id;
  const payment = await EasypaisaResponce.findByIdAndDelete({ _id: _id })
  if (!payment) {
    res.status(500).json({ success: false })
  }
  res.send(payment);
})
router.put(`/UpdateStatusEasypaisaResponce/:id`, async (req, res) => {
  const statuss = await Payment.findByIdAndUpdate(req.params.id,
    {
      status: "Paid by Easypaisa",
    },
    {
      new: true, // for return updated data
    }
  );

  if (!statuss) {
    return res.status(400).send('The Payment cannot be Done!');
  }
  res.send(statuss);
});
module.exports = router;
