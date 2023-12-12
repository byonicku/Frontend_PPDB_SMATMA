import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { berkasInputted } from "../../api/UserHandler";
/* eslint-disable react/prop-types */ 

const BerkasRoutes = ({
  children,
}) => {
  const navigate = useNavigate();
  const [berkas, setBerkas] = useState(false);
  useEffect(() => {
    const berkas = berkasInputted();
    setBerkas(berkas);
    if (!berkas) {
      navigate("/berkas/alreadyinput");
    }
  }, [navigate]);
  return berkas && (children ? children : <Outlet />);
};
export default BerkasRoutes;