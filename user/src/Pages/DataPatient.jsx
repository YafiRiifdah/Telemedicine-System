import React, { useState } from "react";
import img2 from "../assets/img2.svg";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Chart from "../components/Chart";

const patients = [
  {
    id: 1,
    fullName: 'Bayu Ariyo Vonda',
    email: 'Ariyovonda@gmail.com',
    gender: 'Male',
    birthDate: '2004-01-05',
    bloodType: 'O',
    phone: '082243112712',
    address: 'jalan Raya ITS, 101',
  },
  {
    id: 2,
    fullName: 'Muhammad Yafi',
    email: 'yafilala2@gmail.com',
    gender: 'Male',
    birthDate: '2002-05-15',
    bloodType: 'A',
    phone: '087843933023',
    address: 'Jalan Jojoran 1, 85',
  },
  {
    id: 3,
    fullName: 'Fahril Rizal',
    email: 'fahrilrizal2@gmail.com',
    gender: 'Male',
    birthDate: '2001-06-20',
    bloodType: 'B',
    phone: '081722314871',
    address: 'Jalan Raya Menur,125',
  },
];

const DataPatient = () => {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Weekly Hospital Data Overview",
        font: { size: 18 },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { beginAtZero: true, callback: (value) => `${value} Cases` } },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
          {/* Hamburger Menu */}
          <button
            onClick={toggleSidebar}
            className="text-blue-600 text-3xl material-icons-outlined"
          >
            menu
          </button>
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">Data Demografi Pasien</h1>
          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              alert("You have logged out.");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Image */}
        <div className="relative">
          <img
            src={img2}
            alt="Header Image"
            className="w-full h-[400px] object-cover object-center"
          />
        </div>

        {/* Cards and Weekly Overview */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cards */}
          <Cards
            title="Total Patients"
            value="1,245"
            color="text-blue-600"
            description="Active Patients"
          />
          <Cards
            title="Appointments Today"
            value="85"
            color="text-green-600"
            description="Scheduled Appointments"
          />
          <Cards
            title="Doctors Available"
            value="36"
            color="text-yellow-600"
            description="On Duty"
          />

          {/* Weekly Overview Chart */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Chart data={chartData} options={chartOptions} />
          </div>
        </section>

        {/* Table */}
        <div className="text-center mb-6">
          <button
            onClick={toggleTableVisibility}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isTableVisible ? "Sembunyikan Data Pasien" : "Tampilkan Data Pasien"}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${isTableVisible ? "max-h-[800px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
            }`}
        >
          <div className="overflow-x-auto px-8">
            <table className="w-full border-collapse mt-6">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-4 px-6 text-lg text-center">ID</th>
                  <th className="py-4 px-6 text-lg text-center">Full Name</th>
                  <th className="py-4 px-6 text-lg text-center">Email</th>
                  <th className="py-4 px-6 text-lg text-center">Gender</th>
                  <th className="py-4 px-6 text-lg text-center">Birth Date</th>
                  <th className="py-4 px-6 text-lg text-center">Blood Type</th>
                  <th className="py-4 px-6 text-lg text-center">Phone</th>
                  <th className="py-4 px-6 text-lg text-center">Address</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-50`}
                  >
                    <td className="py-4 px-6 text-base text-center">{patient.id}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.fullName}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.email}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.gender}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.birthDate}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.bloodType}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.phone}</td>
                    <td className="py-4 px-6 text-base text-center">{patient.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 w-full">
          <div className="container mx-auto text-center text-base">
            <p>© 2024 Data Demografis Pasien. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DataPatient;