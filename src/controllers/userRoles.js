import models from "../database/models";

const allUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res
      .status(201)
      .json({ message: "All users", count: users.length, response: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const setRole = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await models.User.findOne({ where: { id: userId } });
    if (user.role === "admin") {
      return res.status(400).json({
        message: `You are not allowed to change permissin to the user ${user.role}`,
      });
    }
    if (user.role === `${req.body.role}`) {
      return res
        .status(400)
        .json({ message: `Role ${req.body.role} is already exist` });
    }
    await models.User.update(
      { role: `${req.body.role}` },
      { where: { id: userId } }
    );
    return res
      .status(201)
      .json({ message: `Role ${req.body.role} granted successfully` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  allUsers,
  setRole,
};
