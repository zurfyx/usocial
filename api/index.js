const express = require('express');
const cors = require('cors');

const API = process.env.API || 'http://localhost:4200';
const PORT = process.env.API_PORT || 3001;

const app = express();

const corsOptions = {
  origin: process.env.API,
}
app.use(cors(corsOptions));

app.use('/', (req, res) => {
  res.send('It works');
});

app.listen(PORT, () => console.info(`🗲  API running on port ${PORT}`));
