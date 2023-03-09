import models from '../database/models';
import { validateUser, hashPassword } from '../middleware/user';
const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      include: [
        {
          model: models.Profile,
          as: 'profile',
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
          as: 'profile',
        },
      ],
    });
    if (user) return res.status(200).json({ user });
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');
  req.body.password = await hashPassword(req.body.password);
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({ message: 'Your account has been created successfully', data: user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
