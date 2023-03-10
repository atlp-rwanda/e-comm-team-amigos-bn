import dotenv from 'dotenv';
import passport from 'passport';
import GoogleAuth from "passport-google-oauth20";


dotenv.config();

const GoogleStrategy = GoogleAuth.Strategy;

passport.serializeUser((user, done) => { done(null, user); });

passport.deserializeUser((user, done) => { done(null, user); });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/token/auth/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

