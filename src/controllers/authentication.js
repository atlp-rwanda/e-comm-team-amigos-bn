import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../database/models";
import tokenGenerator from "../helpers/generateToken";
import { sendMail } from "../helpers/sendMail";
import dotenv from "dotenv";
dotenv.config();
const createUser = async (req, res) => {
  const userData = {
    id: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    telephone: req.body.telephone,
    address: req.body.address,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  };
  try {
    const user = await models.User.create(userData);
    const token = tokenGenerator({ userId: user.id }, { expiresIn: "1d" });
    const url = `${process.env.BASE_URL}/user/verify_email/${token}`;
    sendMail(
      user.email,
      "Email Verification",
      "you can now verify your account",
      url
    );
    return res.status(201).json({
      message: "Account created successfully",
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const emailVerification = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = decodeToken;
    const user = await models.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.verified) {
      return res.status(400).json({ message: "Email already verified." });
    }
    user.verified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export const loginUser = async (req, res) => {
  const user = await models.User.findOne({
    where: { email: req.body.email },
  });
  if (!user)
    return res.status(400).json({ message: "Email or Password Incorrect" });
  //const valid = await bcrypt.compare(req.body.password, user.password);
  if(user.verified==false)
  {
    return res.json({message: "You have to first verify your account"})
  }
  bcrypt.compare(req.body.password, user.password, (err, data) => {
    if (err) throw err;
    if (data) {
      const token = tokenGenerator({ userId: user.id });
      return res
        .status(200)
        .json({ message: "User Logged Successfully", token: token });
    } else {
      return res.status(400).json({ message: " Email or Password Incorrect" });
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  emailVerification,
};
