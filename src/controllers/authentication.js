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

export const loginUser = async(req,res) => {
  const user = await models.User.findOne({
      where: {email: req.body.email}
  });
  if (!user) return res.status(400).json({ message: "Email or Password Incorrect"});
  //const valid = await bcrypt.compare(req.body.password, user.password);
   bcrypt.compare(req.body.password, user.password, (err, data) => {
     if (err) throw err;
     if (data) {
      const token = tokenGenerator({ userId: user.id });
       return res.status(200).json({ message: "User Logged Successfully", token: token});
     }else {
       return res.status(400).json({ message: " Email or Password Incorrect"});
     }
   })  
}

module.exports = {
  createUser,
  loginUser
};
