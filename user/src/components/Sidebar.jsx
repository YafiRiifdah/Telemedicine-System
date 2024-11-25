import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate(); // Hook for navigation
    const features = [
        { title: "Data Demografi", icon: "person", path: "/DataPatient" },
        { title: "Pemeriksaan", icon: "science", path: "/pemeriksaan" },
        { title: "Appointment", icon: "event", path: "/appointment" },
        { title: "Jadwal Dokter", icon: "schedule", path: "/jadwal-dokter" },
    ];

    const handleNavigation = (feature) => {
        if (window.confirm(`Apakah Anda ingin memasuki halaman ${feature.title}?`)) {
            navigate(feature.path);
        }
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
        </>
    );
};

export default Sidebar;