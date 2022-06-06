const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/Case");

// Load Lawyer model
const Case = require("../../models/Case");
const CaseRequest = require("../../models/CaseRequest");

//----------------//
//-----Cases------//
//----------------//

// @route POST api/lawyers/registers
// @desc Registers lawyers
// @access  Public
router.post("/addcase", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newCase = new Case({
    title: req.body.title,
    type: req.body.type,
    code: req.body.code,
    client: req.body.client,
    lawyer: req.body.lawyer,
    court: req.body.court,
    hearingDate: req.body.hearingDate,
    description: req.body.description,
    status: req.body.status,
  });
  newCase
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

//---------------Lawyer's Cases------------//
router.get(`/getcases/:name`, async (req, res) => {
  const name = req.params.name;
  const cases = await Case.find({ lawyer: name })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})

//---------------Client's Cases------------//
router.get(`/getcasesClient/:name`, async (req, res) => {
  const name = req.params.name;
  const cases = await Case.find({ client: name })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})

// // GET
// // Get a single Lawyer cases.
// router.get('/getcasess/:lawyer', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const { lawyer } = req.params

//   Case.find({ lawyer }).then(room => res.json(room))
//     .catch(err => res.status(400).json({ ...err, message: 'Failed to fetch Cases' }))
// })

// //Get a list of Cases with a given type of a lawyer
router.get(`/getcasesbyType/:type/:lawyer`, async (req, res) => {
  const type = req.params.type;
  const lawyer = req.params.lawyer;
  const cases = await Case.find({ type: type, lawyer: lawyer })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})

// //Get a list of Cases with a given Court for a lawyer
router.get(`/getcasesbyCourt/:court/:lawyer`, async (req, res) => {
  const court = req.params.court;
  const lawyer = req.params.lawyer;
  const cases = await Case.find({ court: court, lawyer: lawyer })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})


// //Get a list of Cases with a given Client of a lawyer
router.get(`/getcasesClient/:client/:lawyer`, async (req, res) => {
  const client = req.params.client;
  const lawyer = req.params.lawyer;
  const cases = await Case.find({ client: client, lawyer: lawyer })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})

// DELETE 

router.delete('/Delete/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { _id } = req.params._id

  Case.findByIdAndDelete(_id)
    .then(status => res.json({ succes: true, message: 'Case has been deleted.' }))
    .catch(err => res.json({ ...err, message: 'Failed to delete Case.' }))
})

// DELETE 
// Delete a Case.
router.delete(`/deleteCases/:_id`, async (req, res) => {
  const _id = req.params._id;
  const cases = await Case.findByIdAndDelete({ _id: _id })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})

router.put(`/UpdateCase/:id`, async (req, res) => {
  const cases = await Case.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      type: req.body.type,
      code: req.body.code,
      client: req.body.client,
      lawyer: req.body.lawyer,
      court: req.body.court,
      hearingDate: req.body.hearingDate,
      description: req.body.description,
      status: req.body.status,
    },
    {
      new: true, // for return updated data
    }
  );

  if (!cases) {
    return res.status(400).send('The Case cannot be created!');
  }
  res.send(cases);
});

router.put(`/UpdateStatusRejected/:id`, async (req, res) => {
  const cases = await CaseRequest.findByIdAndUpdate(req.params.id,
    {
      status: "Rejected",
    },
    {
      new: true, // for return updated data
    }
  );

  if (!cases) {
    return res.status(400).send('The Case cannot be created!');
  }
  res.send(cases);
});

router.put(`/UpdateStatusAccepted/:id`, async (req, res) => {
  const cases = await CaseRequest.findByIdAndUpdate(req.params.id,
    {
      status: "Accepted",
    },
    {
      new: true, // for return updated data
    }
  );

  if (!cases) {
    return res.status(400).send('The Case cannot be created!');
  }
  res.send(cases);
});

//Client Sending New Request to lawyer for Case.
router.post('/send-CaseRequest', (req, res) => {
  const requestcase = new CaseRequest({
    client: req.body.client,
    title: req.body.title,
    type: req.body.type,
    court: req.body.court,
    lawyer: req.body.lawyer,
    hearingDate: req.body.hearingDate,
    description: req.body.description,
    status: req.body.status,
  })
  requestcase.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
      console.log(err)
    })
})
//---------------Get Case Request------------//
router.get(`/getRequests/:lawyer`, async (req, res) => {
  const name = req.params.lawyer;
  const Requests = await CaseRequest.find({ lawyer: name, status: "pending" })
  if (!Requests) {
    res.status(500).json({ success: false })
  }
  res.send(Requests);
})

//---------------Get Case Request for client------------//
router.get(`/getClientRequest/:client`, async (req, res) => {
  const client = req.params.client;
  const Requests = await CaseRequest.find({ client: client })
  if (!Requests) {
    res.status(500).json({ success: false })
  }
  res.send(Requests);
})

// DELETE 
// Delete a Request.
router.delete(`/deleteRequest/:_id`, async (req, res) => {
  const _id = req.params._id;
  const cases = await CaseRequest.findByIdAndDelete({ _id: _id })
  if (!cases) {
    res.status(500).json({ success: false })
  }
  res.send(cases);
})


module.exports = router;
