/**
* @openapi
* /token/google:
*      get:
*        summary: Request Google Sign In
*        tags: [GOOGLE SIGN IN]
*        responses:
*              '200':
*                description: Redirect to Google sign page
*                content:
*                  text/html:
*                    schema:
*                      type: string
*              '302':
*                description: Redirects
*                content:
*                  text/html:
*                    schema:
*                      type: string
*
*/
