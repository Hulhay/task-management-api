const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const db = require("./config/database");
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger.json');

const port = 8080;

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const app = express();
app.use(bodyParser.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
