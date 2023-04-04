/**
 * @openapi
 *
 * /payment:
 *   post:
 *     summary: Do the payment with stripe API
 *     tags: [Payment]
 *     description: Allow a customer to pay their order using stripe payment gateway
 *     requestBody:
 *       description: Provide orderId and orderProducts to process to checkout
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 example: {"orderId": "5dfe12f3-f954-48a1-8b91-c9426eaf8720","orderProducts": [{"orderId": "5dfe12f3-f954-48a1-8b91-c9426eaf8720","productId": "ec05a93c-2684-4bdd-b0d3-9939e7f54d72","name": "T-shirt","quantity": 1,"unitPrice": 5000}]}
 *
 *     responses:
 *       200:
 *         description: Payment completed successfully
 *       400:
 *         description: Invalid request or missing parameters
 *       401:
 *         description: Unauthorized access or missing authorization header
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */
