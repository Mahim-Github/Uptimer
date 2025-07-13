const express = require("express");
const {
  createMonitor,
  fetchMonitors,
  getMonitorLogs,
  deleteMonitor,
  getDownTimeLogs,
} = require("../controllers/monitorController");
const authMiddleware = require("../middleware/authMiddleware");
const { isAuthorized } = require("../controllers/userController");
const router = express.Router();

router.post("/create", isAuthorized, createMonitor);
router.get("/", isAuthorized, fetchMonitors);
router.delete("/:id", deleteMonitor);
router.get("/logs", isAuthorized, getMonitorLogs);
router.get("/downtimes", isAuthorized, getDownTimeLogs);

// Delete monitor

module.exports = router;
