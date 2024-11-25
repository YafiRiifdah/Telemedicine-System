import React from "react";
import { Line } from "react-chartjs-2";

const Chart = () => {
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
        <div className="bg-white shadow-lg rounded-lg flex justify-center items-center p-8">
            <div style={{ height: "400px", width: "100%", maxWidth: "800px" }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Chart;
