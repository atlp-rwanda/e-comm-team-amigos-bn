import express from "express";
import authentication from "../../controllers/authentication";
import validate from "../../middleware/authValidation";
<<<<<<< HEAD
=======

>>>>>>> ft(signUp):sign up a user
const router = express.Router();
router.post("/create", validate.signUpValidator, authentication.createUser);

export default router;
