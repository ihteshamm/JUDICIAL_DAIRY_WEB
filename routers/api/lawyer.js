const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/lawyerRegister");
const validateLoginInput = require("../../validation/login");
// Load Lawyer model
const Lawyer = require("../../models/Lawyer");

// @route GET api/lawyers/test
// @desc Tests lawyers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "It works!!" }));

// @route POST api/lawyers/registers
// @desc Registers lawyers
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Lawyer.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email Already Exists";
        return res.status(400).json(errors);
      } else {
        Lawyer.findOne({ name: req.body.name })
          .then(user => {
            if (user) {
              errors.name = "Username Already Exists";
              return res.status(400).json(errors);
            } else {
              Lawyer.findOne({ contact: req.body.contact })
                .then(user => {
                  if (user) {
                    errors.contact = "Contact Number Already Exists";
                    return res.status(400).json(errors);
                  } else {
                    const newLawyer = new Lawyer({
                      name: req.body.name,
                      type: req.body.type,
                      fee: req.body.fee,
                      email: req.body.email,
                      address: req.body.address,
                      contact: req.body.contact,
                      gender: req.body.gender,
                      court: req.body.court,
                      experiance: req.body.experiance,
                      password: req.body.password,
                    });
                    newLawyer.save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err));


                  }
                });
            }
          });
      }
    });
});



// @route POST api/lawyers/login
// @desc Login lawyer / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find lawyer by email
  Lawyer.findOne({ email }).then(lawyer => {
    // Check for lawyer
    if (!lawyer) {
      errors.email = "lawyer not found";
      return res.status(404).json(errors);
    }

    // Check Password
    Lawyer.findOne({ password }).then(password => {
      if (password) {
        // lawyer Matched
        const payload = {
          id: lawyer.id,
          name: lawyer.name,
          type: req.body.type,
          fee: req.body.fee,
          email: lawyer.email,
          address: lawyer.address,
          contact: lawyer.contact,
          gender: lawyer.gender,
          court: lawyer.court,
          experiance: lawyer.experiance,
          password: lawyer.password,
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/lawyers/current
// @desc Return Current Lawyer
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.lawyer.id,
      name: req.lawyer.name,
      type: req.body.type,
      fee: req.body.fee,
      email: req.lawyer.email,
      address: req.lawyer.address,
      contact: req.lawyer.contact,
      gender: req.lawyer.gender,
      court: req.lawyer.court,
      experiance: req.lawyer.experiance,

    });
  }
);


router.put(`/UpdateLawyer/:id`, async (req, res) => {
  const lawyer = await Lawyer.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      type: req.body.type,
      fee: req.body.fee,
      email: req.body.email,
      address: req.body.address,
      contact: req.body.contact,
      gender: req.body.gender,
      court: req.body.court,
      experiance: req.body.experiance,
      password: req.body.password,
    },
    {
      new: true, // for return updated data
    }
  );

  if (!lawyer) {
    return res.status(400).send('Lawyer cannot be updated');
  }
  res.send(lawyer);
});

//---------------All Lawyer's List------------//
router.get(`/getLawyers`, async (req, res) => {
  const lawyers = await Lawyer.find();
  if (!lawyers) {
    res.status(500).json({ success: false })
  }
  res.send(lawyers);
})
//---------------My Profile------------//
router.get(`/MyProfile/:name`, async (req, res) => {
  const lawyer = req.params.name;
  const lawyers = await Lawyer.find({lawyer:lawyer});
  if (!lawyers) {
    res.status(500).json({ success: false })
  }
  res.send(lawyers);
})

//---------------My Profile------------//
router.get(`/getLawyerCity/:address`, async (req, res) => {
  const address = req.params.address;
  const lawyers = await Lawyer.find({address:address});
  if (!lawyers) {
    res.status(500).json({ success: false })
  }
  res.send(lawyers);
})

module.exports = router;
