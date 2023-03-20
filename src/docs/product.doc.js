/**
 * @openapi
 * /product/getAllItems:
 *   get:
 *     tags:
 *       - Products
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
 *                 description: The error message and details
 * @swagger
 * /product/create:
 *   post:
 *     summary: Add a new product
 *     security:
 *       - BearerToken: []
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
 */
