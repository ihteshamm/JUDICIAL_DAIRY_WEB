const router = require('express').Router();
const passport = require('passport')

// Client models
const Client = require("../../models/Client")


const StudentValidation = require('../../validation/ClientRegister')

// POST

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { email, id } = req.body

  const { errors, isValid } = StudentValidation(req.body)

  if (!isValid) return res.status(400).json(errors)

  Client.findOne({
    $or: [
      { email },
      { id }
    ]
  }).then(currentUser => {
    if (currentUser) {
      res.status(400).json({ error: 'Client with this id or email already exists.' })
    } else {
      const newClient = new Client(req.body)

      newClient.save()
        .then(client => res.json(client))
        .catch(err => res.status(500).json({ error: 'Failed to save new Client in the DB', err }))
    }
  })

})


// GET


// Get a Client with a given ID
router.get('/id/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;

  Client.find({ id })
    .then(clients => res.json(clients))
    .catch(err => console.log({ error: 'Failed to fetch Clients', err }))
})


router.get('/all', (req, res) => {
  Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json({ ...err, message: 'Failed to fetch all Clients' }))
})



// PUT

// Update Client availability
router.put('/availability', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, isAvailable } = req.body

  Client.findOneAndUpdate({ id }, { $set: { isAvailable } })
    .then(data => res.status(200).json({ message: 'Client has been updated.', success: true }))
    .catch(err => res.json({ ...err, message: 'Failed to update Client.' }))
})


// DELETE 

// Delete a Client with a Client ID
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.body
  Client.findOneAndDelete({ id })
    .then(data => res.json({ message: `Client with ID ${id} has been deleted`, success: true }))
    .catch(err => res.json({ messgae: 'Failed to remove the Client', ...err, success: false }))
})


module.exports = router;
