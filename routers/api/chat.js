const express = require("express");
const router = express.Router();

// Load Input Validation
const validateRegisterInput = require("../../validation/Chat");

// Load Lawyer model
const Chat = require("../../models/Chat");

//----------------//
//-----Chat------//
//----------------//

router.post("/addmessage", (req, res) => {
//  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
      const newChat = new Chat({
        message: req.body.message,
        sender: req.body.sender,
        reciever: req.body.reciever,
        date: req.body.date,
      });
      newChat
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
});


// //Get Messages of given sender & reciever.
router.get(`/getmessages/:sender/:reciever`, async (req, res) => {
  const sender = req.params.sender;
  const reciever = req.params.reciever;
  const messages = await Chat.find({$or:[{ sender: sender, reciever: reciever},
     { reciever: sender, sender: reciever}]})
  if (!messages) {
    res.status(500).json({ success: false })
  }
  res.send(messages);
})


// // DELETE 
// // Delete Messages.
// router.delete(`/deletemessages/:sender/:reciever`, async (req, res) => {
//   const sender = req.params.sender;
//   const reciever = req.params.reciever;
//   const messages = await Chat.findAndDelete({$or:[{ sender: sender, reciever: reciever},
//     { reciever: sender, sender: reciever}]})
//   if (!messages) {
//     res.status(500).json({ success: false })
//   }
//   res.send(messages);
// })


module.exports = router;
