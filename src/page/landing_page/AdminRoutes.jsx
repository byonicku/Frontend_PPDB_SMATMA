import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAdmin } from "../../api/UserHandler";
/* eslint-disable react/prop-types */ 

const AdminRoutes = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  useEffect(() => {
    const user = isAdmin();
    setUser(user);
    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  return user && (children ? children : <Outlet />);
};
export default AdminRoutes;