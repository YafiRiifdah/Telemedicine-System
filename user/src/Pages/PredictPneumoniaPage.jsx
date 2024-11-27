import React, { useState } from 'react';
import axios from 'axios';

const PredictPneumoniaPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Simpan Base64 image
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    if (!image) {
      alert('Harap unggah gambar terlebih dahulu.');
      return;
    }

    setIsLoading(true); // Tampilkan indikator loading
    try {
      const response = await axios.post('/api/predict', { base64Image: image });
      setResult(response.data); // Simpan hasil prediksi
    } catch (error) {
      console.error('Error saat prediksi:', error);
      alert('Terjadi kesalahan saat prediksi.');
    }
    setIsLoading(false); // Sembunyikan indikator loading
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-800 to-teal-600 text-white shadow-lg py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold">Prediksi Pneumonia</h1>
          <p className="mt-4 text-lg">Menganalisis gambar rontgen untuk mendeteksi kemungkinan pneumonia menggunakan kecerdasan buatan.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Unggah Gambar Rontgen Dada Anda</h2>
          <p className="text-gray-600 text-center mb-8">
            Unggah gambar rontgen dada Anda untuk dianalisis dan diprediksi kemungkinan adanya pneumonia.
            Sistem ini menggunakan teknologi kecerdasan buatan untuk memberikan hasil prediksi yang akurat.
          </p>

          {/* Input Gambar */}
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          {/* Preview Gambar */}
          {image && (
            <div className="mb-6 flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Preview Gambar:</h3>
              <img
                src={image}
                alt="Preview"
                className="rounded-lg shadow-lg max-h-64 object-contain border border-gray-200"
              />
            </div>
          )}

          {/* Tombol Prediksi */}
          <div className="text-center mb-6">
            <button
              onClick={handlePredict}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
            >
              {isLoading ? 'Memproses...' : 'Prediksi'}
            </button>
          </div>

          {/* Hasil Prediksi */}
          {result && (
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Hasil Prediksi:</h3>
              <pre className="text-gray-600">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Rumah Sakit XYZ. Semua Hak Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default PredictPneumoniaPage;
