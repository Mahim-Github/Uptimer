import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMonitors } from "../hooks/useMonitors";
import { useMonitorLogs } from "../hooks/useMonitorLogs";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Monitors() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: monitors, isLoading } = useMonitors();
  const { data: monitorLogs, isLoading: isLoading2 } = useMonitorLogs();
  // {"json":{"_id":"673f528647e442545d52d8ee","monitor":"673f49c720d03fc5e1aed69b","statusCode":200,"responseTime":1575.6605999469757,"dnsLookupTime":337.0702999830246,"tcpHandshakeTime":0,"sslHandshakeTime":0,"createdAt":"2024-11-21T15:32:22.490Z","updatedAt":"2024-11-21T15:32:22.490Z","__v":0}}
  const [averagedLogs, setAveragedLogs] = useState([]);

  useEffect(() => {
    if (monitorLogs?.monitorLogs && monitors) {
      // Create a mapping from monitor ID to monitor name
      const monitorIdToName = monitors.reduce((acc, monitor) => {
        acc[monitor._id] = monitor.monitorName;
        return acc;
      }, {});

      // Calculate averaged logs
      const averagedLogs1 = Object.values(
        monitorLogs.monitorLogs.reduce((acc, log) => {
          if (!acc[log.monitor]) {
            acc[log.monitor] = {
              monitor: log.monitor,
              responseTime: 0,
              dnsLookupTime: 0,
              tcpHandshakeTime: 0,
              sslHandshakeTime: 0,
              count: 0,
            };
          }

          acc[log.monitor].responseTime += log.responseTime;
          acc[log.monitor].dnsLookupTime += log.dnsLookupTime;
          acc[log.monitor].tcpHandshakeTime += log.tcpHandshakeTime;
          acc[log.monitor].sslHandshakeTime += log.sslHandshakeTime;
          acc[log.monitor].count += 1;

          return acc;
        }, {}),
      ).map((log) => ({
        monitor: monitorIdToName[log.monitor] || "Unknown Monitor", // Replace ID with name
        responseTime: log.responseTime / log.count,
        dnsLookupTime: log.dnsLookupTime / log.count,
        tcpHandshakeTime: log.tcpHandshakeTime / log.count,
        sslHandshakeTime: log.sslHandshakeTime / log.count,
      }));

      setAveragedLogs(averagedLogs1);
    }
  }, [monitorLogs?.monitorLogs, monitors]);

  if (isLoading) return <div>Loading...</div>;

  const chartData = {
    labels: averagedLogs.map((monitor) => monitor.monitor),
    datasets: [
      {
        label: "Response Times (in milli-seconds)",
        data: averagedLogs.map((monitor) => monitor.responseTime),
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 1,
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
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#525252",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#525252",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col gap-10 px-10">
      {/* Header */}
      <div className="schabo flex min-h-[100px] w-full items-center justify-center rounded-md border-2 border-zinc-300 bg-zinc-50 text-5xl uppercase text-zinc-800">
        MONITOR MANAGEMENT
      </div>

      {/* Re-Stocking Notification */}
      <div className="flex w-full flex-col rounded-md border-2 border-zinc-300 bg-zinc-50 p-4">
        {/* Monitor Table */}
        <table className="mb-8 w-full border-collapse text-zinc-800">
          <thead>
            <tr className="border-b-2 border-zinc-300">
              <th className="p-2 text-left">Monitor Name</th>
              <th className="p-2 text-left">URL</th>
              <th className="p-2 text-left">Request Type</th>
              <th className="p-2 text-left">Request Intervals (seconds)</th>
              <th className="p-2 text-left">Multiregional Analysis</th>
            </tr>
          </thead>
          <tbody>
            {monitors?.map((monitor, index) => (
              <tr
                key={index}
                className="cursor-pointer border-b border-zinc-300 hover:bg-zinc-100"
                onClick={() => {
                  queryClient.setQueryData(["selected-monitor"], monitor);
                  navigate(`/dashboard/monitor-logs/${monitor._id}`);
                }}
              >
                {/* {"json":{"_id":"673f42d60942b7c5f1e251c8","user":"romilrajrana1@gmail.com","monitorName":"Uptimer","url":"www.google.com","requestType":"GET","interval":200,"multiRegion":true,"createdAt":"2024-11-21T14:25:26.358Z","updatedAt":"2024-11-21T14:25:26.358Z","__v":0}} */}
                <td className="p-2">
                  {monitor.monitorName.length > 30
                    ? monitor.monitorName.slice(0, 30) + "..."
                    : monitor.monitorName}
                </td>
                <td className="p-2">
                  {monitor.url.length > 30
                    ? monitor.url.slice(0, 30) + "..."
                    : monitor.url}
                </td>
                <td className="p-2">{monitor.requestType}</td>
                <td className="p-2">{monitor.interval}s</td>
                <td className="p-2">{monitor.multiRegion ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Demand Chart */}
        <div className="relative w-full rounded-md border-2 border-zinc-300 bg-zinc-50 p-4">
          <div className="absolute left-[50%] top-2 w-[fit-content] translate-x-[-50%] rounded-md bg-zinc-800 p-1 text-lg font-semibold text-zinc-50">
            Average Response Times
          </div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Monitors;
