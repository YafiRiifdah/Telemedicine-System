import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ data, options }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg flex justify-center items-center p-8">
            <div style={{ height: "400px", width: "100%", maxWidth: "800px" }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Chart;
