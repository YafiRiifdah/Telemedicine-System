const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexfile = require('./knexfile');

const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 8080;

(async () => {
  app.listen(PORT, () => console.log('Server running on port ${PORT}'));
})();