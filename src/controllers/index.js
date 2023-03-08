import { v4 as uuidv4 } from "uuid";
import models from "../database/models";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      include: [
        {
          model: models.Profile,
          as: "profile",
        },
      ],
    });
    return res.status(200).json({ users });
  } catch (error) {
    // return res.status(500).json({message: error});
    console.log(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.User.findOne({
      where: { id },
      include: [
        {
          model: models.Profile,
          as: "profile",
        },
      ],
    });
    if (user) return res.status(200).json({ user });
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createUser = async (req, res) => {
  let user = await models.User.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("User already registered");
  const password = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await models.User.create({
      id:uuidv4(),
      userName: req.body.userName,
      email: req.body.email,
      password: password,
      role: req.body.role,
      status: req.body.status,
      verified: req.body.verified,
    });
    return res.status(201).json({
      message: "Your account has been created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
