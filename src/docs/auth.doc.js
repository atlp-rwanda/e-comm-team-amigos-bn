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
 *
 * /user/verify_email/{token}:
 *   post:
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
  * /user/forgotPassword/:
 *       post:
 *           tags: [Authentication]
 *           summary: Send reset password email
 *           description: Send an email to the user with a link to reset their password
 *           requestBody:
 *               required: true
 *               content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *           responses:
 *               200:
 *                  description: Email sent successfully
 *               400:
 *                  description: Bad Request
 *               404:
 *                  description: User not found
 *               500:
 *                  description: Internal server error
 * /user/resetPassword/{token}:
 *   put:
 *     tags: [Authentication]
 *     summary: Resets the user's password.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token sent to the user's email address.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The new password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Password is not matched.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 * /user/updatePassword:
 *      patch:
 *          tags: [Authentication]
 *          summary: This helps a registered user to update a password.
 *          description: User update password portal.
 *          parameters:
 *            - name: auth-token
 *              in: header
 *              description: Token generated during login
 *              required: true
 *              schema:
 *                type: string
 *          requestBody:
 *              description: Provide email, old password, and new password
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              oldPass: 
 *                                  type: string
 *                              newPass: 
 *                                  type: string
 * 
 * 
 *
 *          responses:
 *                  '200':
 *                     description: Password updated Successfully
 *                  '400':
 *                     description: Invalid old Password  or Invalid email
 *                  '404':
 *                     description: User not found
 *                  '401':
 *                     description: Unauthorized
 *                  '500':
 *                     description: Internal server error
 */
 
