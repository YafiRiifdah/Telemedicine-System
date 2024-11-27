const express = require('express');
const { register, login } = require('../handlers/authHandlers');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

const express = require('express');
const { register, login } = require('../handlers/authHandlers');
const pasienHandlers = require('../handlers/pasienHandlers');
// const { predictPneumonia } = require('../handlers/predictHandlers');


// Route untuk autentikasi
router.post('/register', register);
router.post('/login', login);

// Route untuk pasien
router.get('/pasien/:id', pasienHandlers.getPatientDetails);
router.post('/pasien', pasienHandlers.addPatient);

// Route untuk ML - Prediksi pneumonia
// router.post('/predict', async (req, res) => {
//     try {
//       const { image } = req.body; // Mengambil gambar dalam format base64
//       if (!image) {
//         return res.status(400).json({ error: 'No image provided' });
//       }
  
//       // Prediksi pneumonia menggunakan model ML
//       const prediction = await predictPneumonia(image);
  
//       res.json({ result: prediction }); // Mengirimkan hasil prediksi
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


module.exports = router;
