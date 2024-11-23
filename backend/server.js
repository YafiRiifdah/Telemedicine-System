const appointments = [
    { day: "Monday", total: 20 },
    { day: "Tuesday", total: 45 },
    { day: "Wednesday", total: 30 },
    { day: "Thursday", total: 60 },
    { day: "Friday", total: 40 },
    { day: "Saturday", total: 50 },
    { day: "Sunday", total: 80 },
];

app.get("/api/appointments/weekly", (req, res) => {
    res.json(appointments);
});
