import express from "express";
import authentication from "../../controllers/authentication";
import { loginUser } from "../../controllers/authentication";
import validate from "../../middleware/authValidation";
import {verifyToken} from "../../middleware/verifyToken";
const router = express.Router();
router.post("/create", validate.signUpValidator, authentication.createUser);
router.post("/login", validate.loginValidator, loginUser);
router.get("/verify_email/:token", authentication.emailVerification);
router.post("/updatePassword",verifyToken, authentication.updatePassword)

export default router;
