import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function PatientQueue() {
  // Mock data for patient queue
  const patientQueue = [
    {
      queueId: "PQ001",
      patientName: "John Doe",
      registrationDate: "29 Oct 2024, 10:00 AM",
      expectedTime: "02:00 AM",
      doctor: "Dr. Smith",
    },
    {
      queueId: "PQ002",
      patientName: "Jane Smith",
      registrationDate: "29 Oct 2024, 10:15 AM",
      expectedTime: "02:15 AM",
      doctor: "Dr. Adams",
    },
    {
      queueId: "PQ003",
      patientName: "Michael Johnson",
      registrationDate: "29 Oct 2024, 10:30 AM",
      expectedTime: "02:30 AM",
      doctor: "Dr. Brown",
    },
    {
      queueId: "PQ004",
      patientName: "Emily Davis",
      registrationDate: "29 Oct 2024, 10:45 AM",
      expectedTime: "02:45 AM",
      doctor: "Dr. Adams",
    },
    {
      queueId: "PQ005",
      patientName: "David Wilson",
      registrationDate: "29 Oct 2024, 11:00 AM",
      expectedTime: "03:00 PM",
      doctor: "Dr. Smith",
    },
  ];

  // Chart data for hourly queue attendance (mock data)
  const hourlyAttendanceData = {
    labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"], // Hours of the day
    datasets: [
      {
        label: "Patients Attended",
        data: [5, 15, 20, 8, 10, 3], // Mock attendance data for each hour
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Zinc color for bars
        borderColor: "rgba(255, 255, 255, 0.8)", // White for border
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#000000", // zinc-800 for the legend labels
        },
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#525252", // zinc-800 for x-axis
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "#525252", // zinc-800 for y-axis
        },
        grid: {
          color: "#e0e0e0", // Light zinc border for y-axis grid
        },
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col gap-10 px-10">
      {/* Header */}
      <div className="schabo flex min-h-[100px] w-full items-center justify-center rounded-md border-2 border-zinc-300 bg-zinc-50 text-5xl uppercase text-zinc-800">
        Patient Queue Status
      </div>

      {/* Patient Queue Table */}
      <div className="flex w-full flex-col rounded-md border-2 border-zinc-300 bg-zinc-50 p-4">
        {/* Notifications */}
        <div className="flex w-full justify-between">
          <div className="mb-4 w-[fit-content] rounded-md bg-green-100 p-1 text-lg font-semibold text-green-500">
            Queue is Optimized at the moment
          </div>
          <div className="mb-4 w-[fit-content] rounded-md bg-zinc-800 p-1 text-lg font-semibold text-zinc-50">
            AI is activated
          </div>
        </div>
        <table className="mb-8 w-full border-collapse text-zinc-800">
          <thead>
            <tr className="border-b-2 border-zinc-300">
              <th className="p-2 text-left">Queue ID</th>
              <th className="p-2 text-left">Patient Name</th>
              <th className="p-2 text-left">Registration Date</th>
              <th className="p-2 text-left">Expected Time</th>
              <th className="p-2 text-left">Doctor Allotted</th>
            </tr>
          </thead>
          <tbody>
            {patientQueue.map((patient, index) => (
              <tr key={index} className="border-b border-zinc-300">
                <td className="p-2">{patient.queueId}</td>
                <td className="p-2">{patient.patientName}</td>
                <td className="p-2">{patient.registrationDate}</td>
                <td className="p-2">{patient.expectedTime}</td>
                <td className="p-2">{patient.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Hourly Attendance Chart */}
        <div className="relative w-full rounded-md border-2 border-zinc-300 bg-zinc-50 p-4">
          <div className="absolute left-[50%] top-2 w-[fit-content] translate-x-[-50%] rounded-md bg-zinc-800 p-1 text-lg font-semibold text-zinc-50">
            Hourly Attendance
          </div>
          <Bar data={hourlyAttendanceData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default PatientQueue;
