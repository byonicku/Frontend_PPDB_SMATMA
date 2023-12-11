import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../api/UserHandler";
/* eslint-disable react/prop-types */ 

const ProtectedRoutes = ({
  children,
}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenDariLS = getToken();
    setToken(tokenDariLS);
    if (!tokenDariLS) {
      navigate("/");
    }
  }, [navigate]);
  return token && (children ? children : <Outlet />);
};
export default ProtectedRoutes;