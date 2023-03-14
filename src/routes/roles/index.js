import express from 'express';
import roles from '../../controllers/roles';
import validation from '../../middleware/roleValidation';

const router = express.Router();
router.get('/users', roles.users);
router.post('/role/create', validation.validateRole, roles.createRole);
router.get('/roles', roles.roles);
router.post('/role/set', validation.validateUserAndRole, roles.setRole);
router.get('/user/role/:id', roles.userWithRole);
router.put('/role/update/:id', validation.validateRole, roles.updateRole);
router.delete('/role/delete/:id', roles.deleteRole);
router.post('/permission/create',validation.validatePermission,roles.createPermission);
router.get('/permissions', roles.permissions);
router.post('/permission/set',validation.validateRoleAndPermission,roles.setPermission);
router.get('/role/permission/:id', roles.roleWithPermission);
router.put('/permission/update/:id', validation.validatePermission, roles.updatePermission);
router.delete('/permission/delete/:id', roles.deletePermission);
export default router;
