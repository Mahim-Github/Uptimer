const https = require("https");
const { performance } = require("perf_hooks");
const Monitor = require("../models/Monitor");
const MonitorLog = require("../models/MonitorLog");
const { sendDowntimeAlert } = require("./emailService");

async function monitorWebsite(monitor) {
  const start = performance.now();
  let dnsLookupTime = 0;
  let tcpHandshakeTime = 0;
  let sslHandshakeTime = 0;

  try {
    const req = https.get(monitor.url, (res) => {
      dnsLookupTime = performance.now();

      // Listen for response data (optional)
      res.on("data", () => {});

      // End of response handling
      res.on("end", async () => {
        const end = performance.now();
        const metrics = {
          statusCode: res.statusCode,
          responseTime: end - start,
          dnsLookupTime: dnsLookupTime - start,
          tcpHandshakeTime,
          sslHandshakeTime,
        };

        // Log metrics to the database
        await MonitorLog.create({
          monitor: monitor._id,
          ...metrics,
          success: res.statusCode >= 200 && res.statusCode < 400, // Success for 2xx or 3xx
        });

        console.log(`Monitor "${monitor.monitorName}": Log saved successfully.`);
      });
    });

    // Capture socket events for performance metrics
    req.on("socket", (socket) => {
      socket.once("lookup", () => {
        tcpHandshakeTime = performance.now() - start; // Time for DNS + TCP handshake
      });

      socket.once("secureConnect", () => {
        sslHandshakeTime = performance.now() - start; // Time for SSL handshake
      });
    });

    // Handle request errors
    req.on("error", async (err) => {
      console.error(`Monitor "${monitor.monitorName}" encountered an error:`, err.message);

      // Log failure to the database
      await MonitorLog.create({
        monitor: monitor._id,
        statusCode: 0, // No response
        responseTime: 0,
        dnsLookupTime: 0,
        tcpHandshakeTime: 0,
        sslHandshakeTime: 0,
        success: false,
      });

      // Send downtime alert
      await sendDowntimeAlert(
        monitor.user.email, // Ensure user email is available
        monitor.monitorName,
        monitor.url
      );
    });

    req.end(); // End the request
  } catch (error) {
    console.error(`Unexpected error in monitoring "${monitor.monitorName}":`, error.message);
  }
}

async function startMonitoring() {
  try {
    // Fetch all monitors from the database
    const monitors = await Monitor.find();

    monitors.forEach((monitor) => {
      // Clear previous intervals, if any
      if (monitor.intervalId) {
        clearInterval(monitor.intervalId);
      }

      // Schedule website monitoring at specified intervals
      monitor.intervalId = setInterval(() => {
        monitorWebsite(monitor);
      }, monitor.interval * 1000); // Convert interval to milliseconds
    });

    console.log("Monitoring started for all monitors.");
  } catch (error) {
    console.error("Error starting monitoring:", error.message);
  }
}

module.exports = { startMonitoring };
