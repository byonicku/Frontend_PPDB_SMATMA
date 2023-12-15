import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ModalPembayaran from "../../components/modal/ModalPembayaran";
import APIMethod from "../../api/APIMethod";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PembayaranFromMasterData = () => {
  const { id_user } = useParams();
  const navigate = useNavigate();
  const [billingData, setBillingData] = useState([]);
  const [paymentHistoryData, setPaymentHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshPembayaran = async () => {
    setLoading(true);

    const billingData = await APIMethod.getPembayaranByUser(id_user);
    setBillingData(billingData.data);

    const paymentHistoryData = await APIMethod.getHistoryByUser(id_user);
    setPaymentHistoryData(paymentHistoryData.data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const billingData = await APIMethod.getPembayaranByUser(id_user);
        setBillingData(billingData.data);

        const paymentHistoryData = await APIMethod.getHistoryByUser(id_user);
        setPaymentHistoryData(paymentHistoryData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/masterdata");
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
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Tagihan</th>
                    <th scope="col">Tanggal Awal</th>
                    <th scope="col">Tanggal Akhir</th>
                    <th scope="col">Jumlah Bayar</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.map((item, index) => (
                    <tr key={item.id_pembayaran}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nama_tagihan}</td>
                      <td>{item.tanggal_awal}</td>
                      <td>{item.tanggal_akhir}</td>
                      <td>{item.jumlah_pembayaran}</td>
                      <td>
                        {item.status_pembayaran === "In Process" ? (
                          <span className="btn btn-success disabled">
                            In Process
                          </span>
                        ) : (
                          <ModalPembayaran
                            id={item.id_pembayaran}
                            onClose={refreshPembayaran}
                          />
                        )}
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
                      <td>{item.tanggal_bayar}</td>
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
