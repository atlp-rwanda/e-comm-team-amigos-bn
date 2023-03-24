/**
 * @openapi
 * /product/{id}:
 *  get:
 *   summary: Get product by ID
 *   tags: [Products]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        required: true
 *      description: alphanumerical UUID of the message to get
 *
 *   description: This is used to get single iteem by its ID.
 *
 *   responses:
 *      200:
 *       description: Returned product
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 */
