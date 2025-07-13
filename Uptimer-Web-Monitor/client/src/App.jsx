import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import MonitorSetup from "./ui/SetupMonitor";
import Analytics from "./pages/Analytics";
import Monitors from "./pages/Monitors";
import { Toaster } from "react-hot-toast";
import MonitorLogs from "./pages/MonitorLogs";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "setup-monitor", element: <MonitorSetup /> },
      { path: "monitors", element: <Monitors /> },
      { path: "monitor-logs/:id", element: <MonitorLogs /> },
      // monitor-logs/673f43c306e6b185ffea73e1
      { path: "analytics", element: <Analytics /> },
    ],
  },
  {
    path: "*",
    element: <span>NO SUCH ROUTE EXISTS</span>,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {/* <ReactQueryDevtools initialIsOpen={false} />db */}
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
