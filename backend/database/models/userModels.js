const pool = require('./database');

const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );
  return rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};
