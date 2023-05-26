/**
 * @openapi
 * /notification:
 *   get:
 *     summary: Get all user notifications
 *     description: Retrieve all notifications that belong to a user
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 * 
 * /notification/mark:
 *   get:
 *     summary: Mark all user notifications as read
 *     description: Mark all notifications that belong to a user
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 */