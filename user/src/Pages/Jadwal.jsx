import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useInView } from "react-intersection-observer";

const Jadwal = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dokterSchedule, setDokterSchedule] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [modalVisible, setModalVisible] = useState(false); // Animation state
    const [selectedDokter, setSelectedDokter] = useState(null); // Selected dokter state

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Simulasi pengambilan data jadwal dokter
    useEffect(() => {
        const scheduleData = [
            { id: 1, nama: "Dr. John Doe", spesialis: "Umum", waktu: "2024-11-26T09:00:00", tersedia: true },
            { id: 2, nama: "Dr. Jane Smith", spesialis: "Kandungan", waktu: "2024-11-27T13:00:00", tersedia: false },
            { id: 3, nama: "Dr. Mike Johnson", spesialis: "Anak", waktu: "2024-11-26T10:00:00", tersedia: true },
            { id: 4, nama: "Dr. Sarah Brown", spesialis: "Gigi", waktu: "2024-11-28T08:00:00", tersedia: true },
            { id: 5, nama: "Dr. Emily Davis", spesialis: "Kulit", waktu: "2024-11-25T15:00:00", tersedia: true },
            { id: 6, nama: "Dr. Alice Cooper", spesialis: "Jantung", waktu: "2024-11-29T11:00:00", tersedia: true },
            { id: 7, nama: "Dr. Robert Lee", spesialis: "Tulang", waktu: "2024-11-30T14:00:00", tersedia: false },
            { id: 8, nama: "Dr. Linda White", spesialis: "Mata", waktu: "2024-12-01T16:00:00", tersedia: true },
            { id: 9, nama: "Dr. James Carter", spesialis: "Telinga", waktu: "2024-12-02T09:00:00", tersedia: true },
            { id: 10, nama: "Dr. Karen Johnson", spesialis: "Gigi", waktu: "2024-12-03T12:00:00", tersedia: false },
        ];

        const today = new Date().toISOString().slice(0, 10);
        const validSchedule = scheduleData.filter((dokter) => {
            const dokterDate = new Date(dokter.waktu).toISOString().slice(0, 10);
            return dokterDate >= today;
        });

        setDokterSchedule(validSchedule);
        setFilteredSchedule(validSchedule); // Default to valid schedules
        setIsLoading(false);
    }, []);

    const { ref: tableRef, inView: tableInView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const filterByDate = (date) => {
        const filtered = dokterSchedule.filter((dokter) =>
            new Date(dokter.waktu).toISOString().slice(0, 10) === date
        );
        setFilteredSchedule(filtered);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
        filterByDate(selectedDate);
    };

    // Handle modal open
    const handleModalOpen = (dokter) => {
        setSelectedDokter(dokter);
        setIsModalOpen(true);
        setTimeout(() => setModalVisible(true), 50); // Trigger animation
    };

    // Handle modal close
    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300); // Delay to sync with animation
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-blue-600">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
            </div>
        );
    }

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
                    <h1 className="text-2xl font-bold text-gray-800">Jadwal Dokter</h1>
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
                <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-8">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl font-extrabold">
                                Jadwal <span className="text-yellow-400">Dokter</span>
                            </h2>
                            <p className="text-md md:text-lg text-gray-200 mt-2">
                                Pilih tanggal untuk melihat jadwal dokter yang tersedia.
                            </p>
                        </div>
                        {/* Filter by Date */}
                        <div>
                            <label htmlFor="date" className="mr-4 text-gray-200 font-medium">
                                Pilih Tanggal:
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="px-4 py-2 border rounded-lg bg-white text-gray-700"
                            />
                        </div>
                    </div>
                </section>

                {/* Jadwal Dokter Table */}
                <section className="p-8">
                    <div
                        ref={tableRef}
                        className={`bg-white shadow-lg rounded-lg p-6 transition-transform duration-1000 ease-in-out ${tableInView ? "transform translate-y-0 opacity-100" : "transform translate-y-10 opacity-0"
                            }`}
                    >
                        <h2 className="text-2xl font-bold text-gray-700 mb-6">Jadwal Dokter</h2>

                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama Dokter</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Spesialis</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Waktu</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ketersediaan</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSchedule.length > 0 ? (
                                    filteredSchedule.map((dokter) => (
                                        <tr
                                            key={dokter.id}
                                            className={`${dokter.tersedia ? "bg-green-50" : "bg-red-50"
                                                } border-b`}
                                        >
                                            <td className="px-4 py-2 text-sm text-gray-800">{dokter.nama}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{dokter.spesialis}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                {new Date(dokter.waktu).toLocaleString()}
                                            </td>
                                            <td
                                                className={`px-4 py-2 text-sm font-bold ${dokter.tersedia ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                {dokter.tersedia ? "Tersedia" : "Tidak Tersedia"}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleModalOpen(dokter)}
                                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                                                >
                                                    Konsultasi
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                                            Tidak ada jadwal untuk tanggal yang dipilih.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Modal Popup */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div
                            className={`bg-white rounded-lg p-6 shadow-lg w-96 transform transition-all duration-500 ease-out ${modalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                                }`}
                        >
                            {/* Header with Icon */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="material-icons-outlined text-4xl text-blue-600">info</span>
                                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Navigasi</h2>
                            </div>

                            {/* Main Text */}
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                {selectedDokter?.tersedia
                                    ? `Dokter `
                                    : `Maaf, Dokter `}
                                <span className="font-extrabold text-blue-600 underline decoration-dotted">
                                    {selectedDokter?.nama}
                                </span>{" "}
                                {selectedDokter?.tersedia
                                    ? `tersedia untuk konsultasi. Anda dapat segera membuat janji temu untuk konsultasi sesuai waktu yang tersedia.`
                                    : `tidak tersedia untuk konsultasi pada waktu ini. Silakan pilih dokter atau jadwal lainnya.`}
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
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="bg-gray-800 text-white text-center py-6">
                    <p>&copy; {new Date().getFullYear()} Rumah Sakit Kami. Semua hak dilindungi.</p>
                </footer>
            </div>
        </div>
    );
};

export default Jadwal;
