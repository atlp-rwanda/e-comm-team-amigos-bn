


/**
* @openapi
* /cart:
*      get:
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
*
*/

