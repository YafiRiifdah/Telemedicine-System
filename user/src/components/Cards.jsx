import React from "react";

const Cards = ({ title, value, color, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold text-gray-700">{title}</h2>
            <span className={`text-4xl font-bold mt-4 ${color}`}>{value}</span>
            <p className="text-gray-500 mt-2">{description}</p>
        </div>
    );
};

export default Cards;
