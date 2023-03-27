/**
* @openapi
* /product/getAllItems:
*   get:
*     tags:
*       - Products
*     summary: Get all products
*     description: Retrieve a list of all products in the collection
*     responses:
*
*       '200':
*         description: A list of products
*         content:
*           schema:
*             type: object
*             properties:
*               Status:
*                 type: string
*                 description: The status of the response
*                 example: OK
*               Message:
*                 type: string
*                 description: A message about the response
*                 example: List of all Products in our collections
*               listProduct:
*                 type: array
*                 description: An array of product objects
*                 items:
*                   $ref: '#/components/schemas/Product'
*
*       '400':
*         description: There is no product in Stock
*         content:
*           schema:
*             type: object
*             properties:
*               Status:
*                 type: string
*                 description: The status of the response
*                 example: Not Found
*               Message:
*                 type: string
*                 description: There is no product in Stock
*                 example: Check your credentials well and try again
*               error:
*                 type: object
*                 description: The error message and details
* /product/create:
*   post:
*     tags:
*       - Products
*     summary: Add a new product
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               price:
*                 type: integer
*                 minimum: 1
*               quantity:
*                 type: integer
*                 minimum: 1
*               available:
*                 type: boolean
*               category:
*                 type: string
*               bonus:
*                 type: integer
*                 minimum: 0
*               images:
*                 type: array
*                 items:
*                   type: string
*                   format: uri
*                   pattern: ^(https?|ftp)://.*(jpeg|jpg|png|gif|bmp)$
*                 minItems: 4
*                 maxItems: 8
*                 uniqueItems: true
*               expiryDate:
*                 type: string
*                 format: date
*               ec:
*                 type: integer
*                 minimum: 0
*                 nullable: true
*     responses:
*       '201':
*         description: Created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       '400':
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Error message
*                   example: The request body is invalid
*       '401':
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Error message
*                   example: Authorization header missing
*       '403':
*         description: Forbidden
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Error message
*                   example: Unauthorized access
*       '409':
*         description: Conflict
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: Error message
*                   example: Product already exists, please update that product instead
* /product/availableProduct:
*   get:
*     tags:
*       - Products
*     description: Returns all available products
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of available products
*         schema:
*           type: array
*       500:
*         description: Internal server error
* /product/availableProduct/{id}:
*   put:
*     tags:
*       - Products
*     summary: Update the availability status of a product
*     parameters:
*       - in: path
*         name: id
*         description: ID of the product to update
*         required: true
*         schema:
*           type: string
*     requestBody:
*              description: Provide email and password
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              available:
*                                  type: boolean
*     responses:
*       200:
*         description: The updated product
*       400:
*         description: Invalid product ID or availability status
*       500:
*         description: Internal server error
* /product/collection:
*   get:
*     summary: Get all items in seller collection
*     description: Retrieve all products that belong to a seller
*     tags:
*       - Products
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   description: The status of the response
*                   example: "OK"
*                 items:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Product'
*                   description: The products that belong to the seller
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   description: The reason for the unauthorized status
*                   example: "Authorization header missing"
*       404:
*         description: Not Found
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   description: The status of the response
*                   example: "Not Found"
*                 error:
*                   type: string
*                   description: The reason for the not found status
*                   example: "There is no item in Collection"
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   description: The status of the response
*                   example: "Bad Request"
*                 error:
*                   type: string
*                   description: The reason for the bad request status
*                   example: "Invalid token"
*
* /product/search:
*   get:
*     tags:
*       - Products
*     description: Return product(s) which matches with certain criteria
*     produces:
*       - application/json
*     parameters:
*        - name: "name"
*          in: "query"
*          description: "Name of the product"
*          required: false
*          type: string
*        - name: minPrice
*          in: "query"
*          description: "Minimum price of product you want to search for"
*          required: false
*          type: integer
*        - name: maxPrice
*          in: "query"
*          description: "Maximum price of product you want to search for"
*          required: false
*          type: integer
*        - name: category
*          in: "query"
*          description: "Category of product you want to search for"
*          required: false
*          type: string
*     responses:
*        200:
*          description: "List of Product(s) matching with search query"
*          schema:
*            type: object
*            properties:
*              status:
*                type: string
*                example: "Ok"
*              message:
*                type: string
*                example: "List of products matching your search"
*              products:
*                type: array
*
*        404:
*          description: "No product found that match the search query"
*          schema:
*             type: object
*             properties:
*               status:
*                  type: string
*                  example: "Not Found"
*               message:
*                  type: string
*                  example: "There are no products matching your search"
*        500:
*          description: "Internal server error"
*          schema:
*            type: object
*            properties:
*              error:
*                type: string
* /product/{id}:
*      patch:
*        summary: Updates a product in seller collection
*        security:
*           - bearerAuth: []
*        tags: [Products]
*        parameters:
*           - in: path
*             name: id
*             required: true
*             schema:
*               type: string
*               format: uuid
*        requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Product'
*        responses:
*              '200':
*                description: Products updated sussessfully
*                content:
*                  application/json:
*                    schema:
*                      $ref: '#/components/schemas/Product'
*              '400':
*                description: Bad Request
*              '401':
*                description: Unauthorised! Please authenticate.
*              '403':
*                description: Request forbiden. You don't have enough privilege.
* /product/delete/{id}:
*   delete:
*     tags:
*       - Products
*     summary: Delete the product from the collection
*     parameters:
*       - in: path
*         name: id
*         description: ID of the product to delete
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: The product deleted successfully!
*       400:
*         description: Invalid product ID or availability status
*       500:
*         description: Internal server error
*/
