import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import APIMethod from "../../api/APIMethod";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalAddPembayaran from "../../components/modal/ModalAddPembayaran";
import ModalEditPembayaran from "../../components/modal/ModalEditPembayaran";
import { toast } from "sonner";
import APIPembayaran from "../../api/APIPembayaran";
import { FaTrash } from "react-icons/fa";
import ModalLihatPembayaran from "../../components/modal/ModalLihatPembayaran";

const PembayaranFromMasterData = () => {
  const { id_user } = useParams();
  const navigate = useNavigate();
  const [billingData, setBillingData] = useState([]);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshPembayaran = async () => {
    try {
      setLoading(true);
      
      const billingData = await APIMethod.getPembayaranByUser(id_user);
      setBillingData(billingData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      await refreshHistory();
    }
  }; 

  const refreshHistory = async () => {
    try {
      setLoading(true);

      const paymentHistoryData = await APIMethod.getHistoryByUser(id_user);
      setPaymentHistoryData(paymentHistoryData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_pembayaran) => {
    try {
      setLoading(true);
      await APIPembayaran.deletePembayaran(id_pembayaran);
      toast.success("Berhasil menghapus data pembayaran");
      await refreshPembayaran();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Gagal menghapus data pembayaran");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const billingData = await APIMethod.getPembayaranByUser(id_user);
        setBillingData(billingData.data);

      } catch (error) {
        console.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const paymentHistoryData = await APIMethod.getHistoryByUser(id_user);
        setPaymentHistoryData(paymentHistoryData.data);

      } catch (error) {
        console.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_user, navigate]);

  return !loading ? (
    <>
      <div className="container mb-3">
        <Link
          to={`/masterdata/profile/${id_user}`}
          className="btn btn-secondary mb-3 me-1"
        >
          User
        </Link>
        <Link
          to={`/masterdata/profile/pembayaran/${id_user}`}
          className="btn btn-primary mb-3"
        >
          Pembayaran
        </Link>

        <div className="card">
          <div className="card-header">
            <h4>Tagihan Pembayaran</h4>
          </div>
          <div className="card-body">
          <div className="col-md-12 col-lg-6 mb-1 text-md-start">
              <ModalAddPembayaran
                id_user={id_user}
                onClose={refreshPembayaran}
              />
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Tagihan</th>
                    <th scope="col">Tanggal Awal</th>
                    <th scope="col">Tanggal Akhir</th>
                    <th scope="col">Jumlah Bayar</th>
                    <th scope="col">Status</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.map((item, index) => (
                    <tr key={item.id_pembayaran}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nama_tagihan}</td>
                      <td>{new Date(item.tanggal_awal).toLocaleDateString("id-ID")}</td>
                      <td>{new Date(item.tanggal_akhir).toLocaleDateString("id-ID")}</td>
                      <td>{item.jumlah_pembayaran.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                      <td>{item.status_pembayaran === null ? "Belum Dibayar" : item.status_pembayaran}</td>
                      <td>
                        <ModalLihatPembayaran
                          data={item}
                          onClose={refreshPembayaran}
                        />
                        <ModalEditPembayaran
                            data={item}
                            onClose={refreshPembayaran}
                          />
                        <button
                          onClick={() => handleDelete(item.id_pembayaran)}
                          className="btn btn-danger ms-1"
                        >
                          <FaTrash className="mb-1 me-1"/>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-header">
            <h4>History Pembayaran</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Tagihan</th>
                    <th scope="col">Tanggal Bayar</th>
                    <th scope="col">Metode Bayar</th>
                    <th scope="col">Jumlah Bayar</th>
                    <th scope="col">Denda</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistoryData.map((item, index) => (
                    <tr key={item.id_pembayaran}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nama_tagihan}</td>
                      <td>{new Date(item.tanggal_bayar).toLocaleDateString("id-ID")}</td>
                      <td>{item.metode_pembayaran}</td>
                      <td>
                        {item.jumlah_pembayaran.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td>
                        {item.denda.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center">
      <Spinner
        animation="border"
        style={{ color: "#0c84a4", width: "3rem", height: "3rem" }}
      />
    </div>
  );
};

export default PembayaranFromMasterData;
