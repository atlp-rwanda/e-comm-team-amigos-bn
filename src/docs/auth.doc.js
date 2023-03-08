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
 *                              name:
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
 * /auth/login:
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
 *                  201:
 *                     description: user logged in successfully!
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 */