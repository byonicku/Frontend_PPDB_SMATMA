import StatusComponent from "../../components/success_component/status_component";
import { useEffect, useState } from "react";
import APIMethod from "../../api/APIMethod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import getUser from "../../api/UserHandler";
import { Spinner } from "react-bootstrap";
import { setUser } from "../../api/UserHandler";

const Diterima = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = JSON.parse(getUser()).data.id_user;
        const user = await APIMethod.getUserByID(id);
        delete user.message;
        setUser(JSON.stringify(user));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return !loading ? (
    <StatusComponent
      title="Selamat!"
      status="success"
      message="Anda dinyatakan lulus dan diterima di SMA Atma Budika!"
    />
  ) : (
    <div className="text-center">
      <Spinner
        animation="border"
        style={{ color: "#0c84a4", width: "3rem", height: "3rem" }}
      />
    </div>
  );
};

export default Diterima;
