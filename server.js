const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const lawyers = require("./routers/api/lawyer");
const clients = require("./routers/api/client");
const chats = require("./routers/api/chat");
const users = require("./routers/api/users");
const paymentrequests = require("./routers/api/PaymentRequest");
const cases = require("./routers/api/case");
const EasypaisaResponce = require("./routers/api/EasypaisaResponce");
const reviews = require("./routers/api/review");
const dictionary = require("./routers/api/dictionary");
const contactuss = require("./routers/api/contactus");

const path = require("path");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/lawyers", lawyers);
app.use("/api/clients", clients);
app.use("/api/cases", cases);
app.use("/api/users", users);
app.use("/api/chats", chats);
app.use("/api/paymentrequests", paymentrequests);
app.use("/api/EasypaisaResponce", EasypaisaResponce);
app.use("/api/reviews", reviews);
app.use("/api/dictionary", dictionary);
app.use("/api/contactuss", contactuss);
// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

//app.listen(port, () => console.log(`Server running on port ${port}`));
io.on('connection', () => { /* … */ });
server.listen(port, () => console.log(`Server running on port ${port}`));


module.exports = { app };

