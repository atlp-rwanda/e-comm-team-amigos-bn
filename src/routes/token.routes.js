import express from "express";
import passport from "passport";
import { failureGogleLogin, successGoogleLogin } from "../controllers/token.controller";

const router = express.Router();


router.get('/google', passport.authenticate("google", { scope: ['email', "profile"] }));

router.get("/auth", (req, res) => {
     res.send("<button><a href='/token/google'>Login With Google</a></button>");
});

router.get('/auth/callback', passport.authenticate("google", {
     successRedirect: "/token/auth/callback/success",
     failureRedirect: "/token/auth/callback/failure"
}));

router.get("/auth/callback/success", successGoogleLogin);

router.get("/auth/callback/failure", failureGogleLogin);

export default router;