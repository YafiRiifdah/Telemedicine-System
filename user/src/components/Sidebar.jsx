import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay (optional) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-6 text-2xl font-bold border-b border-blue-600">
          Hospital Dashboard
        </div>
        <nav className="flex-1 p-6 space-y-6">
          <ul>
            <li>
              <button
                onClick={() => alert("Please login to access Data Demografi")}
                className="flex items-center hover:text-blue-300 w-full text-left"
              >
                <span className="material-icons-outlined mr-2">person</span>
                Data Demografi
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Please login to access Pemeriksaan")}
                className="flex items-center hover:text-blue-300 w-full text-left"
              >
                <span className="material-icons-outlined mr-2">science</span>
                Pemeriksaan
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Please login to access Hasil Deteksi")}
                className="flex items-center hover:text-blue-300 w-full text-left"
              >
                <span className="material-icons-outlined mr-2">fact_check</span>
                Hasil Deteksi
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Please login to access Riwayat")}
                className="flex items-center hover:text-blue-300 w-full text-left"
              >
                <span className="material-icons-outlined mr-2">history</span>
                Riwayat Pemeriksaan
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Please login to access Appointment")}
                className="flex items-center hover:text-blue-300 w-full text-left"
              >
                <span className="material-icons-outlined mr-2">event</span>
                Appointment
              </button>
            </li>
            <li>
              <button
                onClick={() => alert("Please login to access Jadwal")}
                className="flex items-center hover:text-blue-300 w-full text-left"
              >
                <span className="material-icons-outlined mr-2">schedule</span>
                Jadwal Dokter
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
