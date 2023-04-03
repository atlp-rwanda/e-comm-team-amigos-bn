/**
 * @swagger
 * /product/sales/stats:
 *   get:
 *     tags: [Statistics]
 *     summary: Get sales statistics for a user
 *     description: Returns the total revenue, number of orders, products sold, and top selling products for a given user between two dates.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Start date in format YYYY-MM-DD
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: End date in format YYYY-MM-DD
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                 numOrders:
 *                   type: integer
 *                 productsSold:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: integer
 *                         name:
 *                           type: string
 *                 topSellingProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       quantitySold:
 *                         type: integer
 *                       name:
 *                         type: string
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
