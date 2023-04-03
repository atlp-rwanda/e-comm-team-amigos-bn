/**
 * @openapi
 * /order/orderStatus/{orderId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve the status of a specific order
 *     tags: [Order]
 *     description: Retrieve the current status and expected delivery date of a specific order
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the order status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The current status of the order
 *                 expectedDeliveryDate:
 *                   type: string
 *                   format: date-time
 *                   description: The expected delivery date of the order
 *       400:
 *         description: Invalid request or missing parameters
 *       401:
 *         description: Unauthorized access or missing authorization header
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: The specified order does not exist
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update the status of a specific order
 *     tags: [Order]
 *     description: Update the status of a specific order to a new status
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to update
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token with admin privileges
 *     requestBody:
 *       description: The new status of the order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered]
 *                 description: The new status of the order
 *     responses:
 *       200:
 *         description: Successfully updated the order status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The success message
 *                 status:
 *                   type: string
 *                   description: The updated status of the order
 *                 expectedDeliveryDate:
 *                   type: string
 *                   format: date-time
 *                   description: The updated expected delivery date of the order
 *       400:
 *         description: Invalid request or missing parameters
 *       401:
 *         description: Unauthorized access or missing authorization header
 *       403:
 *         description: Forbidden access
 *       404:
 *         description: The specified order does not exist
 *       500:
 *         description: Internal server error
 * /checkout:
 *   post:
 *     summary: Create order
 *     tags: [Order]
 *     description: Allow logged in user to create an order
 *     requestBody:
 *       description: Provide products ids, proce, and quantity to order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 example: [{"product":"328987-3284932-3248023j", "quantity": 50, "unitPrice": 200}, {"product":"328fy7gy987-67f76g8-3248023j", "quantity": 2, "unitPrice": 500}]
 *               deliveryInfo:
 *                 type: object
 *                 example: {"address":"Kk520st", "city": "Kigali", "state": "NY", "zip": "10001"}  
 *
 *     responses:
 *       200:
 *         description: Successfully created an order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                  example: 'success'
 *                data:
 *                  type: object
 *                  properties:
 *                     order:
 *                      type: object
 *       400:
 *         description: Invalid request or missing parameters
 *       401:
 *         description: Unauthorized access or missing authorization header
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 *   get:
 *      summary: Get Orders
 *      tags: [Order]
 *      description: Allow users to get orders, customer only get his orders.
 *      responses:
 *         200:
 *          description: Returned orders
 *          content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               status:
 *               count:
 *               orders:
 *
 * /orders/{id}:
 *  delete:
 *   summary: Delete order by ID
 *   tags: [Order]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: alphanumerical ID of the order to get
 *
 *   description: Delete order by owner.
 *   responses:
 *      200:
 *       description: Order deleted successfuly
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          example: {"status": "success", message: "Order deleted successfully"}
 *      400:
 *         description: Invalid request
 *      401:
 *        description: Unauthorized access or missing authorization header
 *      404:
 *        description: Order not found
 *      403:
 *        description: Forbidden access
 *      500:
 *        description: Internal server error
 *
 *  put:
 *    summary: Update order
 *    tags: [Order]
 *    description: Update order products, quantity, and price
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the order to update
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: Bearer token with normal privileges
 *    requestBody:
 *      description: The new order products details
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              items:
 *                type: array
 *                example: [{"product":"328987-3284932-3248023j", "quantity": 50, "unitPrice": 200}, {"product":"328fy7gy987-67f76g8-3248023j", "quantity": 2, "unitPrice": 500}]
 *    responses:
 *      200:
 *        description: Successfully updated the order status
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: The success message
 *                status:
 *                  type: string
 *                  description: The updated status of the order
 *                expectedDeliveryDate:
 *                  type: string
 *                  format: date-time
 *                  description: The updated expected delivery date of the order
 *      400:
 *        description: Invalid request or missing parameters
 *      401:
 *        description: Unauthorized access or missing authorization header
 *      403:
 *        description: Forbidden access
 *      404:
 *        description: The specified order does not exist
 *      500:
 *        description: Internal server error
 * /orders/admin:
 *   get:
 *      summary: Admin should Get All Orders
 *      tags: [Order]
 *      description: Grants Admins a right to view all orders.
 *      responses:
 *         200:
 *          description: Returned orders
 *          content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *               status:
 *               count:
 *               orders:
 *         400:
 *          description: Invalid request
 *         401:
 *          description: Unauthorized access or missing authorization header
 *         404:
 *          description: Order not found
 *         403:
 *          description: Forbidden access
 *         500:
 *          description: Internal server error
*/
