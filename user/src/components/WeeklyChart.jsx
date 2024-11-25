import React from "react";
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const WeeklyChart = ({ data, options }) => {
    return (
        <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Weekly Overview</h2>
            <div style={{ height: "400px", width: "100%" }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default WeeklyChart;
