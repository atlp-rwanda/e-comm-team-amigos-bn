/**
 * @openapi
 *
 * /users/create:
 *   post:
 *     tags:
 *       - CRUD users by Admin
 *     summary: Admin can create a User
 *     security:
 *       - bearerAuth: []
 *     description: Admin will create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               telephone:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ['user', 'admin']
 *               gender:
 *                 type: string
 *                 enum: ['male', 'female']
 *               preferredLanguage:
 *                 type: string
 *                 enum: ['en', 'fr', 'es']
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     userName:
 *                       type: string
 *                     telephone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     role:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     preferredLanguage:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
/**
 * @swagger
 *
 * /users/user/{id}:
 *   get:
 *     tags:
 *       - CRUD users by Admin
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     description: Returns a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     tags:
 *       - CRUD users by Admin
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     description: Update user profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             userName:
 *               type: string
 *             address:
 *               type: string
 *             telephone:
 *               type: string
 *             email:
 *               type: string
 *             billingAddress:
 *               type: string
 *             preferredLanguage:
 *               type: string
 *             birthdate:
 *               type: string
 *             preferredCurrency:
 *               type: string
 *             gender:
 *               type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Indicates the status of the response
 *                   example: OK
 *                 Message:
 *                   type: string
 *                   description: Message indicating the success of the operation
 *                   example: User successfully updated
 *                 updatedUser:
 *                   type: object
 *                   description: Updated user object
 *                   example:
 *                     id: 1
 *                     firstName: Jane
 *                     lastName: Doe
 *                     email: jane.doe@example.com
 *                     createdAt: "2022-03-01T00:00:00.000Z"
 *                     updatedAt: "2022-03-02T00:00:00.000Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Indicates the status of the response
 *                   example: fail
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid request parameters
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: You are not allowed to perform this action
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Indicates the status of the response
 *                   example: Not Found
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: User does not exist
 */
/**
 * @swagger
 *
 * /users/delete/{id}:
 *   delete:
 *     tags:
 *       - CRUD users by Admin
 *     summary: Deletes a user
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: User successfully deleted.
 *       '401':
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You are not allowed to perform this action.
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 error:
 *                   type: string
 *                   example: User does not exist.
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error message.
 * /admin/product:
 *   get:
 *     tags:
 *       - CRUD product by Admin
 *     summary: Get all products
 *     description: Retrieve a list of all products in the collection
 *     responses:
 *
 *       '200':
 *         description: A list of products
 *         content:
 *           schema:
 *             type: object
 *             properties:
 *               Status:
 *                 type: string
 *                 description: The status of the response
 *                 example: OK
 *               Message:
 *                 type: string
 *                 description: A message about the response
 *                 example: List of all Products in our collections
 *               listProduct:
 *                 type: array
 *                 description: An array of product objects
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *
 *       '400':
 *         description: There is no product in Stock
 *         content:
 *           schema:
 *             type: object
 *             properties:
 *               Status:
 *                 type: string
 *                 description: The status of the response
 *                 example: Not Found
 *               Message:
 *                 type: string
 *                 description: There is no product in Stock
 *                 example: Check your credentials well and try again
 *               error:
 *                 type: object
 *                 description: The error message and details.
 * /admin/product/create/{sellerId}:
 *   post:
 *     tags:
 *       - CRUD product by Admin
 *     summary: Add a new product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *                 minimum: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               available:
 *                 type: boolean
 *               category:
 *                 type: string
 *               bonus:
 *                 type: integer
 *                 minimum: 0
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                   pattern: ^(https?|ftp)://.*(jpeg|jpg|png|gif|bmp)$
 *                 minItems: 4
 *                 maxItems: 8
 *                 uniqueItems: true
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               ec:
 *                 type: integer
 *                 minimum: 0
 *                 nullable: true
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: The request body is invalid
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Authorization header missing
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Unauthorized access
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Product already exists, please update that product instead
* /admin/product/{id}:
 *   get:
 *     tags:
 *       - CRUD product by Admin
 *     summary: Get a product by ID
 *     security:
 *       - bearerAuth: []
 *     description: Returns a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: product ID
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *   patch:
 *        summary: Updates a product in seller collection
 *        security:
 *           - bearerAuth: []
 *        tags: [CRUD product by Admin]
 *        parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             schema:
 *               type: string
 *               format: uuid
 *        requestBody:
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Product'
 *        responses:
 *              '200':
 *                description: Products updated sussessfully
 *                content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Product'
 *              '400':
 *                description: Bad Request
 *              '401':
 *                description: Unauthorised! Please authenticate.
 *              '403':
 *                description: Request forbiden. You don't have enough privilege.
 *   delete:
 *     tags:
 *       - CRUD product by Admin
 *     summary: Delete the product from the collection
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product deleted successfully!
 *       400:
 *         description: Invalid product ID or availability status
 *       500:
 *         description: Internal server error
 */

