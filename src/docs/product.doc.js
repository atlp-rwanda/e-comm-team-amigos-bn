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
 */
