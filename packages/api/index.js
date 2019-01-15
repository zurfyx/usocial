require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('./utils/email');
const routes = require('./routes');

const CLIENT = process.env.REACT_APP_CLIENT || 'http://localhost:3000';
const PORT = process.env.API_PORT || process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: CLIENT,
};
app.use(cors(corsOptions));

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, () => console.info(`⚡ API running on port ${PORT}`));
