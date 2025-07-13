const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const monitorRoutes = require("./routes/monitorRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/monitors", monitorRoutes);

app.get("/", (req, res) => {
  res.send("Uptime Tracker Backend is Running");
});

module.exports = app;
