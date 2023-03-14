/**
 * @openapi
 *
 * /user/users:
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
 *
 * /user/{id}:
 *      post:
 *          tags: [Setting user roles]
 *          summary: This helps admin to set roles for other user.
 *          description: By entering user id and role user information will be updated successfully.
 *          parameters:
 *            - in: path
 *              name: id
 *              description: Provide user id
 *              required: true
 *              schema:
 *                  type: string
 *          requestBody:
 *              description: Provide user role
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              role:
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
 */
