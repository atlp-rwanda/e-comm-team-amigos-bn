import swaggerJsDoc from 'swagger-jsdoc';

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
        BearerToken: {
          type: 'http',
          scheme: 'bearer',
          bearerformat: 'JWT',
        }
      }
    },
    securit: [{
      bearerAuth: []
    }],
    servers: [{
      url: ''
    }]

  },
  apis: ['src/**/*doc.js'],
};

const specs = swaggerJsDoc(options);
export default specs;
