import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedPage;
