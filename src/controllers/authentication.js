import { v4 as uuidv4 } from "uuid";
import models from "../database/models";
import bcrypt from "bcrypt";
import tokenGenerator from "../helpers/generateToken";

const createUser = async (req, res) => {
<<<<<<< HEAD
=======
  let user = await models.User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("Email already in use");
>>>>>>> ft(signUp):sign up a user
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
<<<<<<< HEAD
    const {password, ...data} = user.toJSON();
    const token = tokenGenerator({ userId: user.id });
    return res.status(201).json({
      message: "Account created successfully",
      data: data,
=======
    const token = tokenGenerator({ userId: user.id });
    return res.status(201).json({
      message: "Account created successfully",
      data: user,
>>>>>>> ft(signUp):sign up a user
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
};
