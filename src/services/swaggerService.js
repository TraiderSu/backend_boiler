import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Backend boilerplate API'
    },
    basePath: '/v1'
  },
  apis: [
    `${__dirname}/../v1/auth/authSwagger.js`,
    `${__dirname}/../v1/posts/postsSwagger.js`,
    `${__dirname}/../v1/users/usersSwagger.js`
  ]
};

const specs = swaggerJsDoc(options);

const swaggerService = server => {
  server.use('/apidocs', swaggerUI.serve, swaggerUI.setup(specs));
};

export { swaggerService as default };
