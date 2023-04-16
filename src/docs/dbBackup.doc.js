/**
 * @openapi
 *
 * /database/backup:
 *   post:
 *     summary: Admin can make database backup
 *     tags: [Database backup]
 *     security:
 *       - bearerAuth: []
 *     description: Admin will make database backup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Database backuped successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *       400:
 *         description: Bad request
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */