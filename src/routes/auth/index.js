import express from "express";
import authentication from "../../controllers/authentication";
import { loginUser } from "../../controllers/authentication";
import validate from "../../middleware/authValidation";
const router = express.Router();
router.post("/create", validate.signUpValidator, authentication.createUser);
router.post("/login", validate.loginValidator, loginUser);
router.get("/verify_email/:token", authentication.emailVerification);

export default router;
