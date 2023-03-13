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
 *//**
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
*/