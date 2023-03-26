/**
* 
* @openapi
* /cart:
*      post:
*        summary: Add items/products to the shopping cart
*        tags: [Cart]
*        parameters:
*          - in: query
*            name: productId
*            schema: 
*              type: string
*              format: uuid
*              description: The Id of the product to put in shopping cart
*          - in: query
*            name: quantity
*            schema: 
*              type: integer
*            description: The quantity of given product that you want to put in the cart
*        responses:
*              '200':
*                description: Product added to the cart
*                
*              '400':
*                   description: Bad request
*              '401':
*                   description: Unauthorized
*              '404':
*                   description: Product not found
* /cart/view-cart:
*      get:
*          tags: [Cart]
*          summary: This endpoint helps to view product from buyer's cart.
*          responses:
*                  201:
*                     description: Cart retrieved successfully!
*                  400:
*                     description: Bad Request
*                  404:
*                     description: Not Found
*                  500:
*                     description: Internal server error
* 
* /cart/clean-up-cart:
*      delete:
*          tags: [Cart]
*          summary: This endpoint helps to clean up buyer's cart.
*          responses:
*                  201:
*                     description: Cart clean up successfully!
*                  400:
*                     description: Bad Request
*                  404:
*                     description: Not Found
*                  500:
*                     description: Internal server error
* 
*
* /cart/updateCart/{id}:
*   put:
*     tags:
*       - Cart
*     summary: Update the quantity of a product in the buyer's cart
*     parameters:
*       - in: path
*         name: id
*         description: ID of the product to update in the cart
*         required: true
*         schema:
*           type: string
*     requestBody:
*              description: Provide New quantity of the product in the cart
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              quantity:
*                                  type: integer
*     responses:
*       '200':
*         description: Cart updated successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Confirmation message.
*                 cart:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       productId:
*                         type: integer
*                         description: ID of the product in the cart.
*                       quantity:
*                         type: integer
*                         description: Quantity of the product in the cart.
*                       name:
*                         type: string
*                         description: Name of the product.
*                       price:
*                         type: number
*                         description: Price of the product.
*                       images:
*                         type: array
*                         items:
*                           type: string
*                           description: URL of the product image.
*                 total:
*                   type: number
*                   description: New total price of the cart.
*       '400':
*         description: Invalid quantity.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Error message.
*       '404':
*         description: Product not found in cart.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Error message.
*       '500':
*         description: Server error.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Error message.
*/
