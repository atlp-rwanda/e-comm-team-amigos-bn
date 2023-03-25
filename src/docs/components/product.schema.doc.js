/**
 * @openapi
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  readOnly: true
 *              name:
 *                  type: string
 *              price:
 *                  type: number
 *              available:
 *                  type: boolean
 *              sellerId:
 *                  type: string
 *              quantity:
 *                  type: number
 *              category:
 *                  type: string
 *              images:
 *                  type: array
 *                  items:
 *                      type: string
 *                      format: uri
 *              expiryDate:
 *                  type: string
 *                  format: date
 *              ec:
 *                  type: number
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *              updatedAt: 
 *                  type: string
 *                  format: date-time
 * 
 */