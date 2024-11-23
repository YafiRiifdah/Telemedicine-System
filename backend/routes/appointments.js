const express = require("express");
const router = express.Router();

const weeklyAppointmentsData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  data: [12, 18, 10, 22, 15, 30, 25],
};

router.get("/weekly", (req, res) => {
  res.json(weeklyAppointmentsData);
});

module.exports = router;
