const Monitor = require("../models/Monitor");
const MonitorLog = require("../models/MonitorLog.js");
const { sendRequest } = require("../utils/proxyRequest");

const createMonitor = async (req, res) => {
  try {
    const { monitorName, url, requestType, interval, multiRegion } = req.body;
    const monitor = await Monitor.create({
      user: req.user.email, // Using email instead of ObjectId
      monitorName,
      url,
      requestType,
      interval,
      multiRegion,
    });
    res.status(201).json(monitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find({ user: req.user.email });
    res.status(200).json(monitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a monitor
const deleteMonitor = async (req, res) => {
  try {
    const { id } = req.params;

    await Monitor.findByIdAndDelete(id);
    res.status(200).json({ message: "Monitor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete monitor" });
  }
};

const getMonitorLogs = async (req, res) => {
  try {
    const monitors = await Monitor.find({ user: req.user.email });

    if (!monitors || monitors.length === 0) {
      return res
        .status(404)
        .json({ message: "No monitors found for this user." });
    }

    // Step 2: Collect the monitor IDs to use for finding the logs
    const monitorIds = monitors.map((monitor) => monitor._id);

    // Step 3: Find the monitor logs associated with the user's monitors
    const monitorLogs = await MonitorLog.find({ monitor: { $in: monitorIds } });

    // Step 4: Return the found logs
    res.status(200).json({ monitorLogs });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching monitor logs." });
  }
};

const getDownTimeLogs = async (req, res) => {
  try {
    console.log(req.user.email);

    const monitors = await Monitor.find({
      user: req.user.email,
    });

    const monitorIds = monitors.map((monitor) => monitor._id);

    const monitorLogs = await MonitorLog.find({
      monitor: { $in: monitorIds }, // Match monitor IDs
    });

    const monitorLogsWithDetails = await Promise.all(
      monitorLogs.map(async (log) => {
        const monitorDetails = await Monitor.findById(log.monitor);

        return {
          log,
          monitor: monitorDetails,
        };
      })
    );

    res.status(200).json(monitorLogsWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMonitor,
  fetchMonitors,
  deleteMonitor,
  getMonitorLogs,
  getDownTimeLogs,
};
