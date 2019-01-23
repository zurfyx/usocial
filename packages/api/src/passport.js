/**
 * There's no login/session. Passport simply forwards all requests for controllers to do
 * post-actions with the data.
 */

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/facebook`,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use('google', new GoogleStrategy({
  clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/google`,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use('twitter', new TwitterStrategy({
  consumerKey: process.env.REACT_APP_TWITTER_CLIENT_ID,
  consumerSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: `${process.env.REACT_APP_CLIENT || 'http://localhost:3000'}/dashboard/connect/twitter`,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));
