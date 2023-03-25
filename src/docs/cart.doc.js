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
*/
