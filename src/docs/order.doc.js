/**
 * @openapi
 * /orders/orderStatus/{orderId}:
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
 *     security:
 *       - bearerAuth: []
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
 */
