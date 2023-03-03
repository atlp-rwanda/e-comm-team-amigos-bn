
import swaggerJsDoc from "swagger-jsdoc";
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'E-COMMERCE DOCUMENTATION',
            version: '1.0.0',
            description: 'E-Commerce project documentation'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerformat: 'JWT',
                }
            }
        },
        securit: [{
            bearerAuth: []
        }],
        servers: [{
            url: 'http://localhost:3000'
        }]
        
    },
    apis: ['routes/*.js'],
}
const specs = swaggerJsDoc(options);
export default specs;
