/**
* @openapi
* /newsletter:
*   post:
*     summary: User signs up for a newsletter
*     tags: [Newsletter]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 format: email
*               firstName:
*                 type: string
*               lastName:
*                 type: string
*             required:
*               - email
*               - firstName
*               - lastName
*     responses:
*             '201':
*               description: Subscribed to our newsletter successfully.
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
* /newsletter/verify:
*   get:
*     summary: Verify The email of a subscriber
*     tags: [Newsletter]
*     parameters:
*       - in: query
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*     responses:
*             '200':
*               description: Email verified successfully
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
* /newsletter/unsubscribe:
*   get:
*     summary: User unsubscribe with his ID
*     tags: [Newsletter]
*     parameters:
*       - in: query
*         name: id
*         required: true
*         schema:
*           type: string
*           format: uuid
*     responses:
*             '200':
*               description: User unsbscribed sucessfully
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
* /newsletter/admin:
*   delete:
*     summary: Admin deletes a newsletter subscriber
*     tags: [Admin Newsletter]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*                 format: uuid
*     responses:
*             '200':
*               description: Subscriber deleted sucessfully
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
*   post:
*     summary: Suspend subscriber
*     tags: [Admin Newsletter]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*                 format: uuid
*     responses:
*             '200':
*               description: Subscriber suspended sucessfully
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
*   get:
*     summary: Get all subscribers
*     tags: [Admin Newsletter]
*     responses:
*             '200':
*               description: Subscribers retrieved sucessfully
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
* /newsletter/admin/{email}:
*   get:
*     summary: Get subscriber by email
*     tags: [Admin Newsletter]
*     parameters:
*       - in: path
*         name: email
*         required: true
*         schema:
*           type: string
*           format: email
*     responses:
*             '200':
*               description: Subscriber retrieved sucessfully
*               content:
*                 application/json:
*                   schema:
*                     type: object
*             '400':
*               description: Bad Request
*             '401':
*               description: Unauthorised! Please authenticate.
*             '403':
*               description: Request forbiden. You don't have enough privilege.
*/