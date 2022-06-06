const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/PaymentRequest");

// Load Lawyer model
const Payment = require("../../models/PaymentRequest");

// @route POST api/lawyers/registers
// @desc Registers lawyers
// @access  Public
router.post("/addPaymentRequest", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
      const newRequest = new Payment({
        lawyer_ID:req.body.lawyer_ID,
        lawyer: req.body.lawyer,
        client: req.body.client,
        case: req.body.case,
        amount: req.body.amount,
        description: req.body.description,
        easypaisaname: req.body.easypaisaname,
        easypaisanumber: req.body.easypaisanumber,
        status: req.body.status,
      });
      newRequest
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

//---------------Lawyer's Payment requests list------------//
router.get(`/getPaymentRequest/:name`, async (req, res) => {
  const name = req.params.name;
  const Payments = await Payment.find({ lawyer: name })
  if (!Payments) {
    res.status(500).json({ success: false })
  }
  res.send(Payments);
})

  
//---------------Client's Payments------------//
router.get(`/getPaymentRequestClient/:name`, async (req, res) => {
    const name = req.params.name;
    const Payments = await Payment.find({ client: name , status:"pending"})
    if (!Payments) {
      res.status(500).json({ success: false })
    }
    res.send(Payments);
  })
  
// Delete a Case.
router.delete(`/deletePaymentRequest/:_id`, async (req, res) => {
  const _id = req.params._id;
  const payment = await Payment.findByIdAndDelete({ _id: _id })
  if (!payment) {
    res.status(500).json({ success: false })
  }
  res.send(payment);
})
router.put(`/UpdateStatusPaidByPayment/:id`, async (req,res)=> {
  const statuss = await Payment.findByIdAndUpdate(req.params.id,
      {
        status: "Pay by Cash",
      },
      {
          new: true, // for return updated data
      }
  );

 if(!statuss){
     return res.status(400).send('The Case cannot be created!');
 }
 res.send(statuss);
});

router.put(`/UpdateStatusPaidByEasypaisa/:id`, async (req,res)=> {
  const statuss = await Payment.findByIdAndUpdate(req.params.id,
      {
        status: "Paid by Easypaisa",
      },
      {
          new: true, // for return updated data
      }
  );

 if(!statuss){
     return res.status(400).send('The Case cannot be created!');
 }
 res.send(statuss);
});

module.exports = router;
