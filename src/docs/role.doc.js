/**
 * @openapi
 *
 * /users:
 *      get:
 *          tags: [Setting user roles]
 *          summary: This helps to get all users from database.
 *          description: By listing all the users an admin should be able to set roles of user based on their Id's.
 *
 *          responses:
 *                  201:
 *                     description: user retrieved successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /role/create:
 *      post:
 *          tags: [Setting user roles]
 *          summary: This helps to create roles.
 *          description: By entering role name and description role will be created.
 *          requestBody:
 *              description: Provide role information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              description:
 *                                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Role created successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /roles:
 *      get:
 *          tags: [Setting user roles]
 *          summary: This helps to get all roles from database.
 *          description: By listing all the roles an admin should be able to set roles of user based on their Id's.
 *
 *          responses:
 *                  201:
 *                     description: role retrieved successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /permission/create:
 *      post:
 *          tags: [Setting user roles]
 *          summary: This helps to create permissions.
 *          description: By entering permission name and description permission will be created.
 *          requestBody:
 *              description: Provide permission information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              description:
 *                                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Permission created successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /permissions:
 *      get:
 *          tags: [Setting user roles]
 *          summary: This helps to get all role permission from database.
 *          description: By listing all role permission an admin should be able to set role permissions.
 *
 *          responses:
 *                  201:
 *                     description: permissions retrieved successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /role/set:
 *      post:
 *          tags: [Setting user roles]
 *          summary: This endpint helps to set roles for user.
 *          description: By entering user id and role id user role will be granted.
 *          requestBody:
 *              description: Provide user role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userId:
 *                                  type: string
 *                              roleId:
 *                                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Role granted successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /role/update/{id}:
 *      put:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to update roles.
 *          description: By entering role name and role description role will be updated.
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide role id
 *              required: true
 *              schema:
 *                  type: string
 *
 *          requestBody:
 *              description: Provide role information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              description:
 *                                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: role updated successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /role/delete/{id}:
 *      delete:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to delete role.
 *          description: By entering role id role will be deleted.
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide role id
 *              required: true
 *              schema:
 *                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Role deleted successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /permission/set:
 *      post:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to set role permissions.
 *          description: By entering role id and permission id role permission will be granted.
 *          requestBody:
 *              description: Provide permissions information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              roleId:
 *                                  type: string
 *                              permissionId:
 *                                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Permission granted successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /permission/update/{id}:
 *      put:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to update permissions.
 *          description: By entering permission name and permission description permission will be updated.
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide permission id
 *              required: true
 *              schema:
 *                  type: string
 *
 *          requestBody:
 *              description: Provide permissions information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              description:
 *                                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Permission updated successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /permission/delete/{id}:
 *      delete:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to delete permissions.
 *          description: By entering permission id permission will be deleted.
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide permission id
 *              required: true
 *              schema:
 *                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Permission deleted successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 *
 * /role/permission/{id}:
 *      get:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to get role with it's permissions.
 *          description: Entering role id.
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide role id
 *              required: true
 *              schema:
 *                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: Role permissions
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /user/role/{id}:
 *      get:
 *          tags: [Setting user roles]
 *          summary: This endpoint helps to get a user's role.
 *          description: Entering user id .
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide user id
 *              required: true
 *              schema:
 *                  type: string
 *
 *
 *          responses:
 *                  200:
 *                     description: User roles
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 */
