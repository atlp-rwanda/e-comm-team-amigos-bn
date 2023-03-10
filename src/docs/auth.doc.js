/**
 * @openapi
 * 
 * /user/create:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps to register as a user. 
 *          description: start your registration with names, email, and password.
 *          requestBody:
 *              description: Provide information
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              userName:
 *                                  type: string
 *                              telephone:
 *                                  type: string
 *                              address:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password: 
 *                                  type: string
 * 
 *          responses:
 *                  201:
 *                     description: user registered successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 * 
 * 
 * /user/login:
 *      post:
 *          tags: [Authentication]
 *          summary: This helps a user to login to the ecommerce platform.
 *          description: Enter email and password.
 *          requestBody:
 *              description: Provide email and password
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password: 
 *                                  type: string
 * 
 * 
 *          responses:
 *                  200:
 *                     description: user logged in successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 * /user/verify_email/{token}:
 *   get:
 *     summary: Verify user's email address
 *     description: Verify user's email address using token generated during registration
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Token generated during registration
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *       '400':
 *         description: Email already verified or Invalid token
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
