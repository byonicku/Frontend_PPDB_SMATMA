import default_avatar from "./../../assets/default-avatar.jpg";
import { getPicture } from "../../api/APIConstant";
import "./ProfileFromMasterData.css";
import ModalChangePhoto from "../../components/modal/ModalChangePhoto";
import APIMethod from "../../api/APIMethod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProfileFromMasterData = () => {
  const { id_user } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const refreshProfile = async () => {
    try {
      const user = await APIMethod.getUserByID(id_user);
      delete user.message;
      setUser(user);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/masterdata");
    } finally {
      setLoading(false);
    }
  };

  const isRegistered = !(
    user.ayah === null &&
    user.ibu === null &&
    user.wali === null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await APIMethod.getUserByID(id_user);
        delete user.message;
        console.log(user);
        setUser(user);
      } catch {
        console.log("Error fetching data");
        navigate("/masterdata");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_user, navigate]);

  return !loading ? (
    <div className="container">
      <div className="d-flex flex-row">
        {isRegistered ? (
          <img
            src={getPicture(user.data_user.foto)}
            alt="ProfileFromMasterData"
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
              {user.data_user.name === null
                ? user.data.name
                : user.data_user.name}
            </strong>
          </h1>
          {isRegistered ? (
            <>
              <h1 className="text-left" style={{ fontSize: "24px" }}>
                <strong>{user.data_user.jurusan}</strong>
              </h1>
              <p className="text-left" style={{ fontSize: "18px" }}> 
                Status Pendaftaran : <strong> {user.data_user.status}</strong></p>
              <ModalChangePhoto id={user.data_user.id_data_user} onClose={refreshProfile} />
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
          <div className="col-md-6 border-end">
            {isRegistered ? (
              <>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <p>{user.data.email}</p>
                </div>
                <div className="mb-3">
                  <strong>Tanggal Lahir:</strong>
                  <p>{user.data_user.tanggallahir}</p>
                </div>
                <div className="mb-3">
                  <strong>Tempat Lahir:</strong>
                  <p>{user.data_user.tempatlahir}</p>
                </div>
                <div className="mb-3">
                  <strong>Agama:</strong>
                  <p>{user.data_user.agama}</p>
                </div>
                <div className="mb-3">
                  <strong>Alamat:</strong>
                  <p>{user.data_user.alamat}</p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>RT:</strong>
                      <p>{user.data_user.rt}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>RW:</strong>
                      <p>{user.data_user.rw}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <strong>Email:</strong>
                <p>{user.data.email}</p>
              </div>
            )}
          </div>
          <div className="col-md-6">
            {isRegistered && (
              <>
                <div className="mb-3">
                  <strong>Nomor Telepon:</strong>
                  <p>{user.data_user.no_telp}</p>
                </div>
                <div className="mb-3">
                  <strong>Provinsi:</strong>
                  <p>{user.data_user.provinsi}</p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kabupaten/Kota:</strong>
                      <p>{user.data_user.kota}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kecamatan:</strong>
                      <p>{user.data_user.kecamatan}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kelurahan/Desa:</strong>
                      <p>{user.data_user.kelurahan}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kode Pos:</strong>
                      <p>{user.data_user.kode_pos}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Asal SMP:</strong>
                  <p>{user.data_user.asal_smp}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        {isRegistered && (
          <>
            {user.wali ? (
              <>
                <h3>Data Wali</h3>
                <div className="row">
                  <div className="col-md-6 border-end">
                    <div className="mb-3">
                      <strong>Nama Lengkap:</strong>
                      <p>{user.wali.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <p>{user.wali.tempatlahir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Agama:</strong>
                      <p>{user.wali.agama}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <p>{user.wali.alamat}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RT:</strong>
                          <p>{user.wali.rt}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RW:</strong>
                          <p>{user.wali.rw}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>Nomor Telepon:</strong>
                        <p>{user.wali.no_telp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Provinsi:</strong>
                      <p>{user.wali.provinsi}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kabupaten/Kota:</strong>
                          <p>{user.wali.kota}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kecamatan:</strong>
                          <p>{user.wali.kecamatan}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kelurahan/Desa:</strong>
                          <p>{user.wali.kelurahan}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kode Pos:</strong>
                          <p>{user.wali.kode_pos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Pendidikan Terakhir:</strong>
                      <p>{user.wali.pendidikan_terakhir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <p>{user.wali.pekerjaan}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Penghasilan:</strong>
                      <p>{user.wali.penghasilan}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : user.ibu ? (
              <>
                <h3>Data Ibu</h3>
                <div className="row">
                  <div className="col-md-6 border-end">
                    <div className="mb-3">
                      <strong>Nama Lengkap:</strong>
                      <p>{user.ibu.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <p>{user.ibu.tempatlahir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Agama:</strong>
                      <p>{user.ibu.agama}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <p>{user.ibu.alamat}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RT:</strong>
                          <p>{user.ibu.rt}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RW:</strong>
                          <p>{user.ibu.rw}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>Nomor Telepon:</strong>
                        <p>{user.ibu.no_telp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Provinsi:</strong>
                      <p>{user.ibu.provinsi}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kabupaten/Kota:</strong>
                          <p>{user.ibu.kota}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kecamatan:</strong>
                          <p>{user.ibu.kecamatan}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kelurahan/Desa:</strong>
                          <p>{user.ibu.kelurahan}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kode Pos:</strong>
                          <p>{user.ibu.kode_pos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Pendidikan Terakhir:</strong>
                      <p>{user.ibu.pendidikan_terakhir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <p>{user.ibu.pekerjaan}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Penghasilan:</strong>
                      <p>{user.ibu.penghasilan}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>Data Ayah</h3>
                <div className="row">
                  <div className="col-md-6 border-end">
                    <div className="mb-3">
                      <strong>Nama Lengkap:</strong>
                      <p>{user.ayah.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <p>{user.ayah.tempatlahir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Agama:</strong>
                      <p>{user.ayah.agama}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <p>{user.ayah.alamat}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RT:</strong>
                          <p>{user.ayah.rt}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RW:</strong>
                          <p>{user.ayah.rw}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>Nomor Telepon:</strong>
                        <p>{user.ayah.no_telp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Provinsi:</strong>
                      <p>{user.ayah.provinsi}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kabupaten/Kota:</strong>
                          <p>{user.ayah.kota}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kecamatan:</strong>
                          <p>{user.ayah.kecamatan}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kelurahan/Desa:</strong>
                          <p>{user.ayah.kelurahan}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kode Pos:</strong>
                          <p>{user.ayah.kode_pos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Pendidikan Terakhir:</strong>
                      <p>{user.ayah.pendidikan_terakhir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <p>{user.ayah.pekerjaan}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Penghasilan:</strong>
                      <p>{user.ayah.penghasilan}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <hr />
            <h3>Ijazah</h3>
            <img
              src={getPicture(user.data_user.ijazah)}
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
export default ProfileFromMasterData;
