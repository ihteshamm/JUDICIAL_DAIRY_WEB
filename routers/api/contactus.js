const router = require('express').Router();
const passport = require('passport')

// Contactus models
const Contactus = require("../../models/Contactus")

const ContactusValidation = require('../../validation/contactus')

// POST

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { email, name } = req.body

  const { errors, isValid } = ContactusValidation(req.body)

  if (!isValid) return res.status(400).json(errors)

  Contactus.findOne({
    $or: [
      { email },
      { name }
    ]
  }).then(currentContactus => {
      const newContactus = new Contactus(req.body)
      newContactus.save()
        .then(contactus => res.json(contactus))
        .catch(err => res.status(500).json({ error: 'Failed to save new Contact us  in the DB', err }))
    
  })

})

module.exports = router;
