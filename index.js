import https from 'https';
import fs from 'fs';
import express from 'express';
import  * as dotenv from 'dotenv'; 
import startUp from './routes/startup.js';
import {getLoggerInstance} from './logger.js'

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Midterm Project(Fedex Track API)',
      version: '1.0.0',
    },
  },
  apis: ['index.js', './routes/startup.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const port = 8080

dotenv.config(); 

const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const app = express();

const logger = getLoggerInstance(); 

const server = https.createServer(httpsOptions,app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/', startUp)

 
server.listen(port, () => {    
    logger.info(`Server listening on port ${port}`)
});

