const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const lawyers = mongoose.model("lawyers");
const cases = mongoose.model("cases");
const reviews = mongoose.model("reviews");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );



  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      lawyers.findById(jwt_payload.id)
        .then(lawyers => {
          if (lawyers) {
            return done(null, lawyers);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })    
  );

  
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      cases.findById(jwt_payload.id)
        .then(cases => {
          if (cases ) {
            return done(null, cases );
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })    
  );
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      reviews.findById(jwt_payload.id)
        .then(reviews => {
          if (reviews) {
            return done(null, reviews);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })    
  );


};
