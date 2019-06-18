import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const moduleNames = ['auth', 'users', 'posts', 'teams'];

const options = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Backend boilerplate API'
    },
    basePath: '/v1'
  },
  apis: moduleNames.map(name => `${__dirname}/../v1/${name}/${name}Swagger.yml`)
};

const specs = swaggerJsDoc(options);

const swaggerService = server => {
  server.use('/apidocs', swaggerUI.serve, swaggerUI.setup(specs));
};

export { swaggerService as default };
