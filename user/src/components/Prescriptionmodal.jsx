import React, { useEffect, useState } from "react";

const Prescriptionmodal = ({ prescription, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all duration-500 ease-in-out ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Detail Resep Obat</h3>
        <ul className="space-y-4">
          {prescription.map((drug, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p>
                <strong>Nama Obat:</strong> {drug.name}
              </p>
              <p>
                <strong>Dosis:</strong> {drug.dose}
              </p>
              <p>
                <strong>Cara Penggunaan:</strong> {drug.usage}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right">
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prescriptionmodal;
