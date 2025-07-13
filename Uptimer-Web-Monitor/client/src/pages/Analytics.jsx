import React from "react";
import { useQuery } from "@tanstack/react-query";
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
import { useDowntimeLogs } from "../hooks/useDowntimeLogs";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Analytics() {
  const { data: downtimes, isLoading, error } = useDowntimeLogs();
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const allMonitorsUpToDate = downtimes?.every(
    (downtime) => downtime?.log?.success,
  );

  const chartData = {
    labels: downtimes?.reduce((labels, downtime) => {
      const logDate = new Date(downtime?.log?.createdAt).toLocaleString(
        "en-GB",
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        },
      );

      if (!labels.includes(logDate)) {
        labels.push(logDate);
      }
      return labels;
    }, []),

    datasets: downtimes?.reduce((datasets, downtime, index) => {
      let dataset = datasets.find(
        (dataset) => dataset.label === downtime.monitor.monitorName,
      );

      if (!dataset) {
        const randomColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
        dataset = {
          label: downtime.monitor.monitorName,
          data: [],
          fill: true,
          // downtime?.log?.success
          // ? "rgba(0, 255, 0, 0.5)"
          // : "rgba(255, 0, 0, 0.5)",
          backgroundColor: randomColor,
          borderColor: randomColor,
          borderWidth: 2,
        };
        datasets.push(dataset);
      }

      const logDate = new Date(downtime?.log?.createdAt).toLocaleString(
        "en-GB",
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        },
      );

      const labelIndex = datasets[0].data.findIndex(
        (label) => label === logDate,
      );
      if (labelIndex === -1) {
        dataset.data.push(downtime?.log?.success ? 1 : 0);
      } else {
        const downtimeValue = downtime?.log?.success ? 1 : 0;

        let mappedValue = 0;
        if (downtimeValue === 0) mappedValue = 0;
        else if (downtimeValue === 1) mappedValue = 1;
        else mappedValue = 0.5;
        dataset.data[labelIndex] = mappedValue;
      }

      return datasets;
    }, []),
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
        text: "Downtime Analytics",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-scroll p-4 pl-8">
      <div
        className="schabo flex min-h-[100px] w-full items-center justify-center rounded-md border-2 border-zinc-300 bg-zinc-50 text-5xl uppercase text-zinc-800"
        style={{
          background: allMonitorsUpToDate ? "#87ff8f" : "#ff9292",
          color: allMonitorsUpToDate ? "#00b10c" : "#c60000",
        }}
      >
        {allMonitorsUpToDate
          ? "All Monitors are risk free and up-to-date"
          : "Some Monitors are experiencing downtime!"}
      </div>
      <div className="mt-4 h-[400px] w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Analytics;
