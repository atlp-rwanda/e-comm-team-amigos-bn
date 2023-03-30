/**
* @openapi
* /reviews/{productId}/review:
*   post:
*     summary: Create a new rating and feedback for a product
*     tags:
*       - Review
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         description: ID of the product to create the rating for.
*         schema:
*           type: string
*     requestBody:
*       description: Rating information
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               rate:
*                 type: number
*                 description: The rating for the product, on a scale of 1-5.
*                 minimum: 1
*                 maximum: 5
*                 example: 4
*               feedback:
*                 type: string
*                 description: The feedback for the product.
*                 example: "This product is great!"
*     responses:
*       '201':
*         description: Rating created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Rating Created Successfully
*                 rating:
*                   type: object
*                   properties:
*                     id:
*                       type: number
*                       example: 1
*                     userId:
*                       type: number
*                       example: 1
*                     productId:
*                       type: number
*                       example: 1
*                     rating:
*                       type: number
*                       example: 4
*                     feedback:
*                       type: string
*                       example: This product is great!
*                     createdAt:
*                       type: string
*                       format: date-time
*                       example: 2023-03-28T14:30:00.000Z
*                     updatedAt:
*                       type: string
*                       format: date-time
*                       example: 2023-03-28T14:30:00.000Z
*       '400':
*         description: User has already rated this product
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: You have already rated this product
*       '404':
*         description: Product not found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Product not found
*       '500':
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Internal server error
*/
