import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, isAdmin } from "../../api/UserHandler";
/* eslint-disable react/prop-types */ 

const ProtectedRoutes = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  useEffect(() => {
    const user = !isAdmin();
    setUser(user);
    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  return user && (children ? children : <Outlet />);
};
export default ProtectedRoutes;