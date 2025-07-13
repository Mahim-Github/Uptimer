import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ui/ProtectedRoute";
import { useUser } from "../hooks/userUser";
function HospitalDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useUser();
  return (
    <ProtectedRoute>
      <div className="flex h-full w-full flex-col bg-gray-100">
        {/* NAVBAR */}
        <div className="flex h-[10vh] w-full items-center justify-between border-b-[1px] border-gray-300 bg-white pl-5">
          <div
            className="round8 relative cursor-pointer text-5xl text-zinc-900"
            onClick={() => navigate("/")}
          >
            UPTIMER
          </div>
          <div className="schabo flex h-full w-[300px] items-center justify-center gap-10 text-3xl">
            <span className="menu-a cursor-pointer">HOME</span>
            <span className="menu-a cursor-pointer">ABOUT</span>
            <span className="menu-a cursor-pointer">CONTACT</span>
          </div>
        </div>
        {/* NAVBAR */}

        <div className="flex h-[90vh]">
          {/* SIDEBAR */}
          <div className="flex h-full w-[300px] flex-col items-center gap-20 border-r-[1px] border-gray-300 bg-white pt-10">
            <div className="schabo flex w-full flex-col gap-5 pl-4 text-[28px] uppercase">
              <span
                className={`inline-block w-[fit-content] cursor-pointer rounded-md ${location.pathname === "/dashboard/setup-monitor" ? "bg-zinc-200" : ""} px-2 text-zinc-900 hover:bg-zinc-200`}
                onClick={() => navigate("/dashboard/setup-monitor")}
              >
                Setup Monitor
              </span>
              <span
                className={`inline-block w-[fit-content] cursor-pointer rounded-md ${location.pathname === "/dashboard/monitors" ? "bg-zinc-200" : ""} px-2 text-zinc-900 hover:bg-zinc-200`}
                onClick={() => navigate("/dashboard/monitors")}
              >
                Monitors Management
              </span>
              <span
                className={`inline-block w-[fit-content] cursor-pointer rounded-md ${location.pathname === "/dashboard/analytics" ? "bg-zinc-200" : ""} px-2 text-zinc-900 hover:bg-zinc-200`}
                onClick={() => navigate("/dashboard/analytics")}
              >
                Analytics
              </span>
            </div>
          </div>
          <div className="flex h-full w-full justify-center">
            <div className="h-full w-full max-w-[1075px] overflow-auto bg-gray-100 pb-4 pt-4">
              {useLocation().pathname === "/dashboard" && (
                <div className="schabo flex min-h-[100px] w-full items-center justify-center rounded-md border-2 border-zinc-300 bg-zinc-50 text-[100px] uppercase text-zinc-800">
                  WELCOME BACK, {user?.user?.username}
                </div>
              )}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default HospitalDashboard;
