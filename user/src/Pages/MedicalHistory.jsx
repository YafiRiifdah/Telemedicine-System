import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrescriptionModal from "../components/Prescriptionmodal";

const MedicalHistory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPrescription, setCurrentPrescription] = useState([]);

    const patients = [
        {
            id: 1,
            fullName: "Bayu Ariyo Vonda",
            gender: "Male",
            age: 19,
            phone: "082243112712",
            address: "Jalan Raya ITS, 101",
            medicalHistory: [
                {
                    date: "2024-01-10",
                    doctor: "Dr. Rahmat Hidayat",
                    notes: "Flu biasa, diberi obat.",
                    prescription: [
                        { name: "Paracetamol", dose: "500mg", usage: "3x sehari setelah makan" },
                        { name: "Vitamin C", dose: "1000mg", usage: "1x sehari pagi hari" },
                    ],
                },
                {
                    date: "2024-02-15",
                    doctor: "Dr. Siti Nurhaliza",
                    notes: "Pemeriksaan darah rutin, hasil normal.",
                    prescription: [
                        { name: "Suplemen Zat Besi", dose: "300mg", usage: "2x sehari setelah makan" },
                    ],
                },
            ],
        },
        {
            id: 2,
            fullName: "Muhammad Yafi",
            gender: "Male",
            age: 22,
            phone: "087843933023",
            address: "Jalan Jojoran 1, 85",
            medicalHistory: [
                {
                    date: "2024-01-05",
                    doctor: "Dr. Fadillah",
                    notes: "Sakit kepala ringan.",
                    prescription: [
                        { name: "Ibuprofen", dose: "400mg", usage: "2x sehari setelah makan" },
                    ],
                },
                {
                    date: "2024-03-12",
                    doctor: "Dr. Andi Pranata",
                    notes: "Kontrol tekanan darah.",
                    prescription: [
                        { name: "Captopril", dose: "25mg", usage: "2x sehari sebelum makan" },
                        { name: "Amlodipin", dose: "5mg", usage: "1x sehari malam hari" },
                    ],
                },
            ],
        },
        {
            id: 3,
            fullName: "Fahril Rizal",
            gender: "Male",
            age: 23,
            phone: "081722314871",
            address: "Jalan Raya Menur, 125",
            medicalHistory: [
                {
                    date: "2024-01-20",
                    doctor: "Dr. Rahmat Hidayat",
                    notes: "Cedera lutut, diberikan terapi.",
                    prescription: [
                        { name: "Painkiller", dose: "500mg", usage: "2x sehari setelah makan" },
                    ],
                },
                {
                    date: "2024-02-28",
                    doctor: "Dr. Siti Nurhaliza",
                    notes: "Kontrol pasca terapi.",
                    prescription: [
                        { name: "Suplemen Kalsium", dose: "500mg", usage: "1x sehari malam hari" },
                    ],
                },
            ],
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const patient = patients.find((p) => p.id === parseInt(id));

    if (!patient) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Data Tidak Ditemukan</h1>
                <button
                    onClick={() => navigate("/DataPatient")}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
                >
                    Kembali ke Data Pasien
                </button>
            </div>
        );
    }

    const handlePrescriptionClick = (prescription) => {
        setCurrentPrescription(prescription);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-blue-600">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
                <button
                    onClick={() => navigate("/DataPatient")}
                    className="text-blue-600 text-3xl material-icons-outlined"
                >
                    arrow_back
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Riwayat Medis Pasien</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            {/* Patient Information */}
            <section className="bg-blue-600 text-white py-8 px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">{patient.fullName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p>
                                <strong>Jenis Kelamin:</strong> {patient.gender}
                            </p>
                            <p>
                                <strong>Usia:</strong> {patient.age} tahun
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>No. Telepon:</strong> {patient.phone}
                            </p>
                            <p>
                                <strong>Alamat:</strong> {patient.address}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Medical History Table */}
            <section className="py-8 px-8 flex-1">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Medis</h2>
                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-4 px-6 text-left">Tanggal</th>
                                <th className="py-4 px-6 text-left">Dokter</th>
                                <th className="py-4 px-6 text-left">Catatan</th>
                                <th className="py-4 px-6 text-center">Resep</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patient.medicalHistory.map((history, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50`}
                                >
                                    <td className="py-4 px-6">{history.date}</td>
                                    <td className="py-4 px-6">{history.doctor}</td>
                                    <td className="py-4 px-6">{history.notes}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handlePrescriptionClick(history.prescription)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                                        >
                                            Resep
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* Modal */}
            {isModalOpen && (
                <PrescriptionModal
                    prescription={currentPrescription}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 mt-auto">
                <div className="container mx-auto text-center text-sm">
                    <p>© {new Date().getFullYear()} Hospital Management System. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MedicalHistory;