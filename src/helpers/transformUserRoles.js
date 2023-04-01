exports.transformUserRoles = (roles) => {
    return roles.map((role) => role.Role.name)
}
