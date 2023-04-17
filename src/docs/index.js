import swaggerJsDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'E-COMMERCE DOCUMENTATION',
            version: '1.0.0',
            description: 'E-Commerce project documentation',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerformat: 'JWT',
                },
                google_auth: {
                    type: 'oauth2',
                    flows: {
                        authorizationCode: {
                            authorizationUrl:
                                'https://accounts.google.com/o/oauth2/auth',
                            tokenUrl: 'https://oauth2.googleapis.com/token',

                            scopes: {
                                'https://www.googleapis.com/auth/userinfo.email':
                                    'View your email address',
                                'https://www.googleapis.com/auth/userinfo.profile':
                                    'View your basic profile info',
                            },
                            clientSecret: {
                                type: 'apiKey',
                                in: 'header',
                                name: 'Authorization',
                            },
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'https://e-comm-team-amigos-bn-project.onrender.com',
            },
            {
                url: 'http://localhost:4000',
            },
            {
                url: 'http://localhost:3000'
            }
        ],
    },
    apis: ['src/**/*doc.js'],
};
/**
 * @swagger
 * components:
 *   schemas:
 *     LoggerConfig:
 *       type: object
 *       properties:
 *         transports:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TransportConfig'
 *         format:
 *           $ref: '#/components/schemas/FormatConfig'
 *         defaultMeta:
 *           type: object
 *           properties:
 *             service:
 *               type: string
 *       required:
 *         - transports
 *         - format
 *         - defaultMeta
 *
 *   schemas:
 *     TransportConfig:
 *       type: object
 *       properties:
 *         level:
 *           type: string
 *         filename:
 *           type: string
 *       required:
 *         - level
 *         - filename
 *
 *   schemas:
 *     FormatConfig:
 *       type: object
 *       properties:
 *         json:
 *           type: function
 *         timestamp:
 *           type: function
 *         metadata:
 *           type: function
 *         prettyPrint:
 *           type: function
 *         errors:
 *           type: function
 *           properties:
 *             stack:
 *               type: boolean
 *       required:
 *         - json
 *         - timestamp
 *         - metadata
 *         - prettyPrint
 *         - errors
 */

const specs = swaggerJsDoc(options)
export default specs
