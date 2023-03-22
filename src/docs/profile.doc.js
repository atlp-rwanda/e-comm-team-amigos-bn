/**
 * @openapi
 * /user/profile:
 *   get:
 *     tags: [Profile]
 *     summary: Ge user's profile
 *     description: Get logged in user profile.
 *     responses:
 *       '200':
 *         description: Update user's profile
 *       '401':
 *         description: User not authenticated
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 *
 * /user/updateMe:
 *   patch:
 *     tags: [Profile]
 *     summary: Update Profile
 *     descritpion: Allow logged in user to update his/her profile
 *     requestBody:
 *      description: Profile data
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                example: Eric
 *              lastName:
 *                type: string
 *                example: Ndungutse
 *              address:
 *                type: string
 *                example: Kigali, Rwanda
 *              preferredLanguage:
 *                type: string
 *                example: English
 *              gender:
 *                type: string
 *                example: Male
 *              preferredCurrency:
 *                type: string
 *                example: Frw
 *              billingAddress:
 *                type: strig
 *                example: Kigali, Rwanda
 *              telephone:
 *                type: string
 *                example: 250785439850
 *              birthdate:
 *                type: Date
 *                example: 2002-12-27
 *            required: true
 *
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *       '400':
 *         description: Validation failure
 *       '401':
 *         description: User not authenticated
 *       '403':
 *         description: Forbiden
 *       '500':
 *         description: Internal server error
 *
 * /user/{userId}:
 *   get:
 *    summary: Get user profile by ID
 *    tags: [Profile]
 *    parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: string
 *         required: true
 *       description: numerical ID of the user to get
 *
 *    description: This is used to get single user by ID.
 *
 *    responses:
 *       200:
 *        description: Returned user
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 */
