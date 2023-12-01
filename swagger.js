const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Customers API',
    },
    host: 'cse341-project2-z5y7.onrender.com',
    schemes: ['https','http'],
  };

  const outputFile = './swagger.json';
  const endpointsFiles = ['./routes/index.js'];
  
  // generate swagger.json
  swaggerAutogen(outputFile, endpointsFiles, doc);
  
  // Run server after it gets generated
  // swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  //   await import('./index.js');
  // });