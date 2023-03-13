import { v4 as uuidv4 } from "uuid";
import models from "../database/models";
import bcrypt from "bcrypt";
import tokenGenerator from "../helpers/generateToken";

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
    const {password, ...data} = user.toJSON();
    const token = tokenGenerator({ userId: user.id });
    return res.status(201).json({
      message: "Account created successfully",
      data: data,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
};
