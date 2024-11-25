import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import img2 from "../assets/img2.svg";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Chart from "../components/Chart";

const patients = [
  {
    id: 1,
    fullName: "Bayu Ariyo Vonda",
    email: "Ariyovonda@gmail.com",
    gender: "Male",
    birthDate: "2004-01-05",
    bloodType: "O",
    phone: "082243112712",
    address: "jalan Raya ITS, 101",
  },
  {
    id: 2,
    fullName: "Muhammad Yafi",
    email: "yafilala2@gmail.com",
    gender: "Male",
    birthDate: "2002-05-15",
    bloodType: "A",
    phone: "087843933023",
    address: "Jalan Jojoran 1, 85",
  },
  {
    id: 3,
    fullName: "Fahril Rizal",
    email: "fahrilrizal2@gmail.com",
    gender: "Male",
    birthDate: "2001-06-20",
    bloodType: "B",
    phone: "081722314871",
    address: "Jalan Raya Menur,125",
  },
];

const DataPatient = () => {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Loading duration
    return () => clearTimeout(timer);
  }, []);

  // UseInView hook for animation
  const { ref: cardRef, inView: cardInView } = useInView({ triggerOnce: true });
  const { ref: chartRef, inView: chartInView } = useInView({ triggerOnce: true });
  const { ref: tableRef, inView: tableInView } = useInView({ triggerOnce: true });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-blue-600 text-3xl material-icons-outlined"
          >
            menu
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Data Demografi Pasien</h1>
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

        {/* Cards Section */}
        <section
          className={`p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            cardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          ref={cardRef}
        >
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
        </section>

        {/* Weekly Overview Chart */}
        <div
          className={`px-8 transition-all duration-1000 ${
            chartInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          ref={chartRef}
        >
          <Chart />
        </div>

        {/* Table Section */}
        <div className="text-center mt-8 mb-6">
          <button
            onClick={toggleTableVisibility}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isTableVisible ? "Sembunyikan Data Pasien" : "Tampilkan Data Pasien"}
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            isTableVisible ? "max-h-[800px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
          }`}
          ref={tableRef}
        >
          <div className="overflow-x-auto px-8">
            <table className="w-full border-collapse mt-6 bg-white shadow-lg rounded-lg">
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
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
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
        <footer className="bg-gray-800 text-white py-4 w-full mt-8">
          <div className="container mx-auto text-center text-base">
            <p>© 2024 Data Demografis Pasien. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DataPatient;
