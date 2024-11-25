
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.development);

const runMigrations = async () => {
  try {
    console.log('Running migrations...');
    await db.migrate.latest();
    console.log('Migrations completed.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

const authRoutes = require('./routes/authRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;

(async () => {
  await runMigrations();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
