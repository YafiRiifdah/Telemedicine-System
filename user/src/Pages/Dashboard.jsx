import React, { useState, useEffect } from "react";
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
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`fixed z-20 top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
            >
                <div className="p-6 text-2xl font-bold border-b border-blue-600">
                    Hospital Dashboard
                </div>
                <nav className="flex-1 p-6">
                    <ul className="space-y-4">
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

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            setIsVisible(true);
        }, 2000);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const chartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Appointments",
                data: [20, 45, 30, 60, 40, 50, 80],
                fill: false,
                borderColor: "#6366F1",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Weekly Appointments Overview",
            },
        },
    };

    return (
        <>
            {isLoading ? (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
                </div>
            ) : (
                <div
                    className={`flex h-screen bg-gray-100 transform transition-opacity duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                    }`}
                >
                    {/* Sidebar */}
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <header className="bg-white shadow-md p-6 flex justify-between items-center">
                            <button
                                onClick={toggleSidebar}
                                className="text-blue-800 text-2xl material-icons-outlined"
                            >
                                menu
                            </button>
                            <h1 className="text-2xl font-bold text-gray-700">Welcome</h1>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Login
                            </button>
                        </header>

                        {/* Dashboard Content */}
                        <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-lg font-bold text-gray-700">Total Patients</h2>
                                <span className="text-4xl font-bold text-blue-600 mt-4">1,245</span>
                                <p className="text-gray-500 mt-2">Active Patients</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-lg font-bold text-gray-700">Appointments Today</h2>
                                <span className="text-4xl font-bold text-green-600 mt-4">85</span>
                                <p className="text-gray-500 mt-2">Scheduled Appointments</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-lg font-bold text-gray-700">Doctors Available</h2>
                                <span className="text-4xl font-bold text-yellow-600 mt-4">36</span>
                                <p className="text-gray-500 mt-2">On Duty</p>
                            </div>

                            {/* Reports Section */}
                            <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold text-gray-700 mb-4">Weekly Overview</h2>
                                <div
                                    className="rounded-lg"
                                    style={{ height: "600px", width: "100%" }}
                                >
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
