import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMonitorLogs } from "../hooks/useMonitorLogs";

// Register chart.js components
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function MonitorLogs() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: logs, isLoading, error } = useMonitorLogs();
  const queryClient = useQueryClient();
  const selectedMonitor = queryClient.getQueryData(["selected-monitor"]) || {};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const monitorLogs = logs.monitorLogs.filter((log) => log.monitor === id);

  const sslHandshakeTimes = monitorLogs.map((log) => log.sslHandshakeTime);
  const tcpHandshakeTimes = monitorLogs.map((log) => log.tcpHandshakeTime);
  const dnsLookupTimes = monitorLogs.map((log) => log.dnsLookupTime);
  const responseTimes = monitorLogs.map((log) => log.responseTime);

  const chartData = {
    labels: monitorLogs.map((log, index) => `Log ${index + 1}`),
    datasets: [
      {
        label: "SSL Handshake Time",
        data: sslHandshakeTimes,
        fill: false,
        borderColor: "#23cfff",
        tension: 0.1,
      },
      {
        label: "TCP Handshake Time",
        data: tcpHandshakeTimes,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "DNS Lookup Time",
        data: dnsLookupTimes,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
      {
        label: "Response Time",
        data: responseTimes,
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#000000",
        },
      },
      title: {
        display: true,
        text: `Analytics for Monitor :${selectedMonitor.monitorName}`,
      },
    },
  };

  return (
    <div className="relative h-full w-full flex-col items-center overflow-y-scroll p-4 pl-8">
      <div
        className="absolute left-0 top-0 cursor-pointer text-4xl"
        onClick={() => navigate("/dashboard/monitors")}
      >
        &larr;
      </div>
      <h1 className="mb-4 text-center text-2xl font-bold underline">
        Monitor Logs Analytics
      </h1>
      <h2 className="font-semibold">
        MONITOR NAME: {selectedMonitor.monitorName}
      </h2>
      <h2 className="font-semibold">MONITOR URL: {selectedMonitor.url}</h2>
      <h2 className="font-semibold">
        REQUEST TYPE: {selectedMonitor.requestType}
      </h2>
      <h2 className="font-semibold">
        MULTI-REGION:{" "}
        {selectedMonitor.multiRegion ? "Enabled✅" : "Disabled ❌"}
      </h2>
      <div className="mt-4 h-[400px] w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default MonitorLogs;
