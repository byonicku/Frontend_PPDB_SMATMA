import StatusComponent from "../../components/success_component/status_component";
import { useEffect } from "react";
import { useState } from "react";
import { APIMethod } from "../../utils/ApiMethod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import getUser from "../../api/UserHandler";
import { Spinner } from "react-bootstrap";
import { setUser } from "../../api/UserHandler";

const BelumInput = () => {
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
      title="Anda Belum Input Data!"
      status="failed"
      message="Silahkan input data ke menu berkas terlebih dahulu."
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

export default BelumInput;
