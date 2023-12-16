import getUser, { berkasInputted } from "../../api/UserHandler";
import default_avatar from "./../../assets/default-avatar.jpg";
import { getPicture } from "../../api/APIConstant";
import "./Profile.css";
import ModalChangePhoto from "../../components/modal/ModalChangePhoto";
import { setUser } from "../../api/UserHandler";
import APIMethod from "../../api/APIMethod";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(getUser()));
  const [ortu, setOrtu] = useState([]);
  const [jenisOrtu, setJenisOrtu] = useState("");
  const [loading, setLoading] = useState(true);
  const isRegistered = !berkasInputted();
  const navigate = useNavigate();

  const refreshProfile = async () => {
    try {
      setLoading(true);
      const id = JSON.parse(getUser()).data.id_user;
      const user = await APIMethod.getUserByID(id);
      delete user.message;
      setUser(JSON.stringify(user));
      setCurrentUser(user);

      const ortu = user.ayah || user.ibu || user.wali;
      const jenisOrtu = user.ayah
        ? "Ayah"
        : user.ibu
        ? "Ibu"
        : user.wali
        ? "Wali"
        : "";
      setOrtu(ortu);
      setJenisOrtu(jenisOrtu);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = JSON.parse(getUser()).data.id_user;
        const user = await APIMethod.getUserByID(id);
        delete user.message;
        setUser(JSON.stringify(user));
        setCurrentUser(user);

        const ortu = user.ayah || user.ibu || user.wali;
        const jenisOrtu = user.ayah
          ? "Ayah"
          : user.ibu
          ? "Ibu"
          : user.wali
          ? "Wali"
          : "";

        setOrtu(ortu);
        setJenisOrtu(jenisOrtu);
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
    <div className="container">
      <div className="d-flex flex-row">
        {isRegistered ? (
          <img
            src={getPicture(currentUser.data_user.foto)}
            alt="Profile"
            className="img-profile border shadow-sm"
          />
        ) : (
          <img
            src={default_avatar}
            alt="Default Avatar"
            className="img-profile border shadow-sm"
          />
        )}
        <div className="container my-auto mx-2">
          <h1 className="text-left">
            <strong>
              {currentUser.data_user.name === null
                ? currentUser.data.name
                : currentUser.data_user.name}
            </strong>
          </h1>
          {isRegistered ? (
            <>
              <h1 className="text-left" style={{ fontSize: "24px" }}>
                <strong>{currentUser.data_user.jurusan}</strong>
              </h1>
              <h2 className="text-left">{currentUser.data.status}</h2>
              <ModalChangePhoto
                id={currentUser.data_user.id_data_user}
                onClose={refreshProfile}
              />
            </>
          ) : (
            <h2 className="text-left">Belum isi berkas</h2>
          )}
        </div>
      </div>
      <hr />
      <div className="container">
        <h3>Data Diri</h3>
        <div className="row">
          <div className="col-md-12 col-lg-6 border-end">
            {isRegistered ? (
              <>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <p>{currentUser.data.email}</p>
                </div>
                <div className="mb-3">
                  <strong>Tanggal Lahir:</strong>
                  <p>
                    {new Date(
                      currentUser.data_user.tanggallahir
                    ).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="mb-3">
                  <strong>Tempat Lahir:</strong>
                  <p>{currentUser.data_user.tempatlahir}</p>
                </div>
                <div className="mb-3">
                  <strong>Agama:</strong>
                  <p>{currentUser.data_user.agama}</p>
                </div>
                <div className="mb-3">
                  <strong>Jenis Kelamin:</strong>
                  <p>{currentUser.data_user.jenis_kelamin}</p>
                </div>
                <div className="mb-3">
                  <strong>Alamat:</strong>
                  <p>{currentUser.data_user.alamat}</p>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>RT:</strong>
                      <p>{currentUser.data_user.rt}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>RW:</strong>
                      <p>{currentUser.data_user.rw}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <strong>Email:</strong>
                <p>{currentUser.data.email}</p>
              </div>
            )}
          </div>
          <div className="col-md-12 col-lg-6">
            {isRegistered && (
              <>
                <div className="mb-3">
                  <strong>Nomor Telepon:</strong>
                  <p>{currentUser.data_user.no_telp}</p>
                </div>
                <div className="mb-3">
                  <strong>Provinsi:</strong>
                  <p>{currentUser.data_user.provinsi}</p>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kabupaten/Kota:</strong>
                      <p>{currentUser.data_user.kota}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kecamatan:</strong>
                      <p>{currentUser.data_user.kecamatan}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kelurahan/Desa:</strong>
                      <p>{currentUser.data_user.kelurahan}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kode Pos:</strong>
                      <p>{currentUser.data_user.kode_pos}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Asal SMP:</strong>
                  <p>{currentUser.data_user.asal_smp}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        {isRegistered && (
          <>
            <h3>Data {jenisOrtu} </h3>
            <div className="row">
              <div className="col-md-12 col-lg-6 border-end">
                <div className="mb-3">
                  <strong>Nama Lengkap:</strong>
                  <p>{ortu.name}</p>
                </div>
                <div className="mb-3">
                  <strong>Tempat Lahir:</strong>
                  <p>{ortu.tempatlahir}</p>
                </div>
                <div className="mb-3">
                  <strong>Agama:</strong>
                  <p>{ortu.agama}</p>
                </div>
                <div className="mb-3">
                  <strong>Alamat:</strong>
                  <p>{ortu.alamat}</p>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>RT:</strong>
                      <p>{ortu.rt}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>RW:</strong>
                      <p>{ortu.rw}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Jenis Kelamin:</strong>
                      <p>{currentUser.data_user.jenis_kelamin}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Nomor Telepon:</strong>
                      <p>{ortu.no_telp}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="mb-3">
                  <strong>Provinsi:</strong>
                  <p>{ortu.provinsi}</p>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kabupaten/Kota:</strong>
                      <p>{ortu.kota}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kecamatan:</strong>
                      <p>{ortu.kecamatan}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kelurahan/Desa:</strong>
                      <p>{ortu.kelurahan}</p>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="mb-3">
                      <strong>Kode Pos:</strong>
                      <p>{ortu.kode_pos}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Pendidikan Terakhir:</strong>
                  <p>{ortu.pendidikan_terakhir}</p>
                </div>
                <div className="mb-3">
                  <strong>Pekerjaan:</strong>
                  <p>{ortu.pekerjaan}</p>
                </div>
                <div className="mb-3">
                  <strong>Penghasilan:</strong>
                  <p>{ortu.penghasilan}</p>
                </div>
              </div>
            </div>
            <hr />
            <h3>Ijazah</h3>
            <img
              src={getPicture(currentUser.data_user.ijazah)}
              alt="Ijazah"
              className="img-fluid"
            />
            <hr />
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center">
      <Spinner
        animation="border"
        style={{ color: "#0c84a4", width: "3rem", height: "3rem" }}
      />
    </div>
  );
};
export default Profile;
