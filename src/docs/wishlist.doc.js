/**
* @openapi
* /wishlist/add/{id}:
*      post:
*        summary: Add products to the wish list
*        tags: [wish list]
*        parameters:
*          - in: path
*            name: id
*            description: ID of the product to be added
*            required: true
*            schema:
*              type: string
*        responses:
*              200:
*                   description: Product added to the Wish list               
*              400:
*                   description: Bad request
*              401:
*                   description: Unauthorized
*              404:
*                   description: Product not found
*              500:
*                  description: Internal server error
*
* /wishlist/remove/{id}:
*      delete:
*        summary: Remove products from the wish list
*        tags: [wish list]
*        parameters:
*          - in: path
*            name: id
*            description: ID of the product to be deleted
*            required: true
*            schema:
*              type: string
*        responses:
*              200:
*                   description: Product removed from the Wish list               
*              400:
*                   description: Bad request
*              401:
*                   description: Unauthorized
*              404:
*                   description: Product not found
*              500:
*                  description: Internal server error
*
*/