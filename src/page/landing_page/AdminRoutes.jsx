import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import getUser, { getToken } from "../../api/UserHandler";
/* eslint-disable react/prop-types */ 

const AdminRoutes = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = getUser();
    setUser(user);
    if (user !== 'admin') {
      navigate("/");
    }
  }, [navigate]);
  return user && (children ? children : <Outlet />);
};
export default AdminRoutes;