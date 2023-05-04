import models from '../database/models';

const PAGE_SIZE = 5; // Number of items per page

const users = async (req, res) => {
    const { page } = req.query;

    const currentPage = parseInt(page) || 1;

    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
    try {
        const users = await models.User.findAll({
            include: [
                {
                    model: models.UserRole,
                    as: 'UserRoles',
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            model: models.Role,
                            as: 'Role',

                            attributes: {
                                exclude: [
                                    'id',
                                    'description',
                                    'createdAt',
                                    'updatedAt',
                                ],
                            },
                        },
                    ],
                },
            ],
            attributes: {
                exclude: [
                    'password',
                    'otpcode',
                    'otpcodeexpiration',
                    'gender',
                    'passwordResetTime',
                    'createdAt',
                    'updatedAt',
                    'birthdate',
                    'fcmToken',
                    'preferredCurrency',
                    'preferredLanguage',
                ],
            },
            offset: offset,
            limit: limit,
        });
        // Calculate total number of Users and pages
        const totalCount = await models.User.count();
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        // Generate pagination links for previous and next pages
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const responseData = {
            currentPage: currentPage,
            totalPages: totalPages,
            previousPage: prevPage,
            nextPage: nextPage,
            users: users,
        };
        return res.status(200).json({
            message: 'Users',
            count: users.length,
            response: responseData,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createRole = async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
    };
    try {
        const role = await models.Role.create(data);
        return res.status(201).json({
            message: 'Role',
            response: role,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const roles = async (req, res) => {
    const { page } = req.query;

    const currentPage = parseInt(page) || 1;

    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
    try {
        const roles = await models.Role.findAll({
            offset: offset,
            limit: limit,
        });
        // Calculate total number of Roles and pages
        const totalCount = await models.Role.count();
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        // Generate pagination links for previous and next pages
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const responseData = {
            currentPage: currentPage,
            totalPages: totalPages,
            previousPage: prevPage,
            nextPage: nextPage,
            roles: roles,
        };
        return res.status(200).json({
            message: 'Roles',
            count: roles.length,
            response: responseData,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createPermission = async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
    };
    try {
        const permission = await models.Permission.create(data);
        return res.status(201).json({
            message: 'Permission',
            response: permission,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const permissions = async (req, res) => {
    const { page } = req.query;

    const currentPage = parseInt(page) || 1;

    const offset = (currentPage - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
    try {
        const permissions = await models.Permission.findAll({
            offset: offset,
            limit: limit,
        });
        // Calculate total number of Permissions and pages
        const totalCount = await models.Permission.count();
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);
        // Generate pagination links for previous and next pages
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const responseData = {
            currentPage: currentPage,
            totalPages: totalPages,
            previousPage: prevPage,
            nextPage: nextPage,
            permissions: permissions,
        };
        return res.status(200).json({
            message: 'Permissions',
            count: permissions.length,
            response: responseData,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const setRole = async (req, res) => {
    const roleData = {
        userId: req.body.userId,
        roleId: req.body.roleId,
    };

    try {
        const userRole = await models.UserRole.create(roleData);
        return res.status(201).json({ message: 'Role', response: userRole });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const removeRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        const userRole = await models.UserRole.destroy({
            where: {
                userId: userId,
                roleId: roleId,
            },
        });
        if (!userRole)
            return res.status(404).json({
                status: 'fail',
                message: 'No user found wuth that role',
            });
        return res.status(200).json({ message: 'Role deleted.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await models.Role.findOne({ where: { id } });
        if (!role) {
            return res
                .status(404)
                .json({ message: `Role witth ${id} doesn't exist` });
        }
        await role.update(
            { name: req.body.name, description: req.body.description },
            { where: { id } }
        );
        return res.status(201).json({ message: 'Role updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await models.Role.findOne({ where: { id } });
        if (!role) {
            return res
                .status(404)
                .json({ message: `Role witth ${id} doesn't exist` });
        }
        await models.UserRole.destroy({ where: { roleId: id } });
        await models.RolePermission.destroy({ where: { roleId: id } });
        await role.destroy();
        return res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const userWithRole = async (req, res) => {
    const {id} = req.params;
    const {email} = req.params;

    const query = id && {id} || {email}

    try {
        const user = await models.User.findOne({
            where: query,
attributes:{exclude:["password"]},
            include: [
                {
                    model: models.UserRole,
                    as: 'UserRoles',
                    include: [
                        {
                            model: models.Role,
                            as: 'Role',
                        },
                    ],
                },
            ],
        });



const name = user.firstName + " "  + user.lastName;

if(!user) return res
            .status(404)
            .json({ message: 'No user found.' });

        return res
            .status(200)
            .json({ message: 'User with roles', response: {email: user.email, id: user.id, name,  userRoles:user.UserRoles} });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const roleWithPermission = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await models.Role.findOne({
            where: { id },
            include: [
                {
                    model: models.RolePermission,
                    as: 'RolePermissions',
                    include: [
                        {
                            model: models.Permission,
                            as: 'Permission',
                        },
                    ],
                },
            ],
        });
        return res.status(201).json({ message: 'Role', response: role });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const setPermission = async (req, res) => {
    const permissionData = {
        roleId: req.body.roleId,
        permissionId: req.body.permissionId,
    };
    try {
        const rolePermission = await models.RolePermission.create(
            permissionData
        );
        return res.status(201).json({
            message: 'Permission',
            response: rolePermission,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePermission = async (req, res) => {
    const { id } = req.params;
    try {
        const permission = await models.Permission.findOne({ where: { id } });
        if (!permission) {
            return res
                .status(404)
                .json({ message: `Role witth ${id} doesn't exist` });
        }
        await permission.update(
            { name: req.body.name, description: req.body.description },
            { where: { id } }
        );
        return res
            .status(201)
            .json({ message: 'Permission updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deletePermission = async (req, res) => {
    const { id } = req.params;
    try {
        const permission = await models.Permission.findOne({ where: { id } });
        if (!permission) {
            return res
                .status(404)
                .json({ message: `Permission witth ${id} doesn't exist` });
        }
        await models.RolePermission.destroy({ where: { permissionId: id } });
        await permission.destroy();
        return res
            .status(200)
            .json({ message: 'Permission deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    users,
    createRole,
    roles,
    setRole,
    updateRole,
    deleteRole,
    createPermission,
    permissions,
    setPermission,
    userWithRole,
    roleWithPermission,
    updatePermission,
    deletePermission,
    removeRole,
};
