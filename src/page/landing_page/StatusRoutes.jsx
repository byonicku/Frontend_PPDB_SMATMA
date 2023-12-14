import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import getUser from "../../api/UserHandler";
/* eslint-disable react/prop-types */ 

const StatusRoutes = ({
  children,
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const statusUser = JSON.parse(getUser()).data_user.status;
    
    if (statusUser === null) {
       setStatus(true);
    } else {
       setStatus(statusUser);
    }
    
    if (status === "Waiting") {
      navigate("/status/waiting");
    }

    if (status === "Accepted") {
      navigate("/status/accepted");
    }

    
  }, [navigate, status]);
  return status && (children ? children : <Outlet />);
};
export default StatusRoutes;