const bcrypt = require('bcryptjs');

// Masukkan hash password dari database
const hashedPassword = '$2a$10$...' // Ganti dengan hash yang sebenarnya dari database

// Masukkan password plain text yang ingin diuji
const plainPassword = 'password123';

// Bandingkan password plain text dengan hash
bcrypt.compare(plainPassword, hashedPassword).then((isMatch) => {
  console.log('Password match:', isMatch); // Output: true jika cocok, false jika tidak
});
