import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const navigate = useNavigate();

    const features = [
        { title: "Data Demografi", icon: "person", path: "/DataPatient" },
        { title: "Pemeriksaan", icon: "science", path: "/pemeriksaan" },
        { title: "Appointment", icon: "event", path: "/appointment" },
        { title: "Jadwal Dokter", icon: "schedule", path: "/jadwal-dokter" },
    ];

    const handleNavigation = (feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
        setTimeout(() => setModalVisible(true), 50);
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    };

    const confirmNavigation = () => {
        navigate(selectedFeature.path);
        closeModal();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-20 top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
            >
                <div className="p-6 text-2xl font-bold border-b border-blue-500">
                    <span className="text-white">Hospital Dashboard</span>
                </div>
                <nav className="flex-1 p-6 space-y-4">
                    {features.map((feature, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavigation(feature)}
                            className="flex items-center gap-4 px-4 py-2 w-full text-left rounded-lg hover:bg-blue-700"
                        >
                            <span className="material-icons-outlined">{feature.icon}</span>
                            {feature.title}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className={`bg-white rounded-lg p-6 shadow-lg w-96 transform transition-all duration-500 ease-out ${
                            modalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                        }`}
                    >
                        {/* Header with Icon */}
                        <div className="flex items-center gap-4 mb-4">
                            <span className="material-icons-outlined text-4xl text-blue-600">
                                info
                            </span>
                            <h2 className="text-xl font-bold text-gray-800">
                                Konfirmasi Navigasi
                            </h2>
                        </div>

                        {/* Main Text */}
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Apakah Anda yakin ingin memasuki halaman{" "}
                            <span className="font-extrabold text-blue-600 underline decoration-dotted">
                                {selectedFeature?.title}
                            </span>
                            ? Pastikan data Anda sudah tersimpan sebelum melanjutkan.
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmNavigation}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
