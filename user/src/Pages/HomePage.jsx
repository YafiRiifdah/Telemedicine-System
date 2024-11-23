import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const features = [
        { title: "Data Demografi", icon: "person" },
        { title: "Pemeriksaan", icon: "science" },
        { title: "Appointment", icon: "event" },
        { title: "Jadwal Dokter", icon: "schedule" },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`fixed z-20 top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                <div className="p-6 text-2xl font-bold border-b border-blue-500">
                    <span className="text-white">Hospital Dashboard</span>
                </div>
                <nav className="flex-1 p-6 space-y-4">
                    {features.map((feature, index) => (
                        <button
                            key={index}
                            onClick={() => alert(`${feature.title} akan ditampilkan di sini.`)}
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

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const chartData = {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "Appointments",
                data: [30, 55, 40, 65, 85, 70, 95],
                borderColor: "#4F46E5",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "#4F46E5",
                pointBorderColor: "#FFF",
                tension: 0.4,
            },
            {
                label: "New Patients",
                data: [25, 45, 35, 50, 75, 65, 90],
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "#10B981",
                pointBorderColor: "#FFF",
                tension: 0.4,
            },
            {
                label: "Discharges",
                data: [15, 35, 20, 40, 60, 50, 70],
                borderColor: "#F59E0B",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                borderWidth: 2,
                pointBackgroundColor: "#F59E0B",
                pointBorderColor: "#FFF",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: "Weekly Hospital Data Overview",
                font: {
                    size: 18,
                },
            },
        },
        layout: {
            padding: {
                top: 30,
                bottom: 30,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    callback: (value) => `${value} Cases`,
                },
            },
        },
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
                    <button
                        onClick={toggleSidebar}
                        className="text-blue-600 text-3xl material-icons-outlined"
                    >
                        menu
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Hospital Home Page</h1>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </header>

                {/* Welcome Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                            Welcome to <span className="text-yellow-400">Our Hospital</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-8">
                            We are dedicated to delivering the best healthcare services with
                            advanced technology and a team of highly skilled professionals.
                            Your health is our priority.
                        </p>
                        <button
                            className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-all"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Explore Services
                        </button>
                    </div>
                </section>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div
                            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 transform transition-all duration-500 scale-100 opacity-100 animate-modal-enter"
                            onAnimationEnd={(e) => {
                                if (e.animationName === "modal-exit") {
                                    setIsModalOpen(false);
                                }
                            }}
                        >
                            <h2 className="text-xl font-bold mb-4 text-gray-700">Our Services</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Outpatient Services</li>
                                <li>Inpatient Services</li>
                                <li>Emergency Care</li>
                                <li>Diagnostic Imaging</li>
                                <li>Specialist Clinics</li>
                            </ul>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Cards and Chart Section */}
                <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Cards */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-lg font-bold text-gray-700">Total Patients</h2>
                        <span className="text-4xl font-bold text-blue-600 mt-4">1,245</span>
                        <p className="text-gray-500 mt-2">Active Patients</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-lg font-bold text-gray-700">Appointments Today</h2>
                        <span className="text-4xl font-bold text-green-600 mt-4">85</span>
                        <p className="text-gray-500 mt-2">Scheduled Appointments</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-lg font-bold text-gray-700">Doctors Available</h2>
                        <span className="text-4xl font-bold text-yellow-600 mt-4">36</span>
                        <p className="text-gray-500 mt-2">On Duty</p>
                    </div>

                    {/* Chart */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white shadow-lg rounded-lg flex justify-center items-center p-8">
                        <div style={{ height: "400px", width: "100%", maxWidth: "800px" }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white text-center py-6">
                    <p>&copy; {new Date().getFullYear()} Your Hospital. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
