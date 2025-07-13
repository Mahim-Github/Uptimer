import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useUser();

  useEffect(() => {
    if (
      !user?.user?.authenticated &&
      !location.pathname === "/signin" &&
      !location.pathname === "/signup" &&
      !location.pathname === "/"
    )
      navigate("/signin");
  }, [location.pathname, navigate, user?.user?.authenticated]);
  console.log(user);
  return children;
}

export default ProtectedRoute;
