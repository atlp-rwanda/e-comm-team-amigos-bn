import models from '../database/models';

const validateRole = async (req, res, next) => {
  const name = await models.Role.findOne({ where: { name: req.body.name } });
  if (name) {
    return res.status(409).json({ error: 'Role already exist' });
  }
  next();
};

const validatePermission = async (req, res, next) => {
  const name = await models.Permission.findOne({
    where: { name: req.body.name },
  });
  if (name) {
    return res.status(409).json({ error: 'Permission already Exist' });
  }
  next();
};

const validateUserAndRole = async (req, res, next) => {
  const userId = await models.User.findOne({
    where: { id: req.body.userId },
  });
  const roleId = await models.Role.findOne({
    where: { id: req.body.roleId },
  });

  if (!userId) {
    return res.status(404).json({ error: 'User Id does not exist' });
  }

  if (!roleId) {
    return res.status(404).json({ error: 'Role Id does not exist' });
  }

  const alreadyRoleExist = await models.UserRole.findOne({
    where: { userId: req.body.userId, roleId: req.body.roleId },
  });
  if (alreadyRoleExist) {
    return res.status(409).json({ error: 'Role already Exist' });
  }

  next();
};

const validateRoleAndPermission = async (req, res, next) => {
  const roleId = await models.Role.findOne({ where: { id: req.body.roleId } });
  const permissionId = await models.Permission.findOne({
    where: { id: req.body.permissionId },
  });

  if (!roleId) {
    return res.status(404).json({ error: 'Role Id does not exist' });
  }

  if (!permissionId) {
    return res.status(404).json({ error: 'Permission Id does not exist' });
  }

  const alreadyPermissionExist = await models.RolePermission.findOne({
    where: { roleId: req.body.roleId, permissionId: req.body.permissionId },
  });

  if (alreadyPermissionExist) {
    return res.status(409).json({ error: 'Permission already Exist' });
  }

  next();
};

export default {
  validateRole,
  validatePermission,
  validateUserAndRole,
  validateRoleAndPermission,
};
