import default_avatar from "./../../assets/default-avatar.jpg";
import { getPicture } from "../../api/APIConstant";
import "./ProfileFromMasterData.css";
import ModalChangePhoto from "../../components/modal/ModalChangePhoto";
import ModalChangeIjazah from "../../components/modal/ModalChangeIjazah";
import APIMethod from "../../api/APIMethod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";
import { cities, provinces } from "../../constant/input_constant.jsx";
import { useMutation } from "@tanstack/react-query";

const ProfileFromMasterData = () => {
  const { id_user } = useParams();
  const [user, setUser] = useState([]);
  const [ortu, setOrtu] = useState([]);
  const [jenisOrtu, setJenisOrtu] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [editOrtu, setEditOrtu] = useState(false);
  const [formUserData, setFormUserData] = useState([]);
  const [formDataOrtu, setFormDataOrtu] = useState([]);
  const navigate = useNavigate();

  const refreshProfile = async () => {
    try {
      const user = await APIMethod.getUserByID(id_user);
      delete user.message;
      setUser(user);
      setFormUserData(user.data_user);
      setFormDataOrtu(user.ayah || user.ibu || user.wali);

      if (user.ayah) {
        setJenisOrtu("Ayah");
        setOrtu(user.ayah);
      } else if (user.ibu) {
        setJenisOrtu("Ibu");
        setOrtu(user.ibu);
      } else if (user.wali) {
        setJenisOrtu("Wali");
        setOrtu(user.wali);
      }
    } catch (error) {
      toast.info("Error fetching data");
      console.error("Error fetching data:", error);
      navigate("/masterdata");
    } finally {
      setLoading(false);
    }
  };

  const handleUserEdit = () => {
    setEditUser(!editUser);
    setFormUserData(user.data_user);
    setFormDataOrtu(user.ayah || user.ibu || user.wali);
  };

  const handleInputUserChange = (e) => {
    const { name, value } = e.target;
    setFormUserData({ ...formUserData, [name]: value });
  };

  const handleInputOrtuChange = (e) => {
    const { name, value } = e.target;
    setFormDataOrtu({ ...formDataOrtu, [name]: value });
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
        setUser(user);
        setFormUserData(user.data_user);
        setFormDataOrtu(user.ayah || user.ibu || user.wali);
        if (user.ayah) {
          setJenisOrtu("Ayah");
          setOrtu(user.ayah);
        } else if (user.ibu) {
          setJenisOrtu("Ibu");
          setOrtu(user.ibu);
        } else if (user.wali) {
          setJenisOrtu("Wali");
          setOrtu(user.wali);
        }
      } catch {
        console.log("Error fetching data");
        navigate("/masterdata");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_user, navigate]);

  const dataUserQuery = useMutation(
    {
      mutationFn: (data) => APIMethod.updateBerkas(data, user.data_user.id_data_user),
      onSuccess: (data) => {
        toast.success("Data berhasil diubah!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onMutate: () => {
        setLoading(true);
      }
    }
  );

  const dataOrtuQuery = useMutation(
    {
      mutationFn: (data) => APIMethod.updateBerkasOrtu(data, jenisOrtu, ortu),
      onSuccess: (data) => {
        toast.success("Data berhasil diubah!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onMutate: () => {
        setLoading(true);
      }
    }
  );

  const handleFormUserSubmit = async (e) => {
    e.preventDefault();

    try {
      await dataUserQuery.mutateAsync(formUserData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setEditUser(false);
      setLoading(false);
      await refreshProfile();
    }
  }

  const handleFormOrtuSubmit = async (e) => {
    e.preventDefault();

    try {
      await dataOrtuQuery.mutateAsync(formDataOrtu);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setEditOrtu(false);
      setLoading(false);
      await refreshProfile();
    }
  }

  console.log(formDataOrtu);
  console.log(formUserData);
  return !loading ? (
    <div className="container">
      <Link
        to={`/masterdata/profile/${id_user}`}
        className="btn btn-primary mb-3 me-1"
      >
        User
      </Link>
      <Link
        to={`/masterdata/profile/pembayaran/${id_user}`}
        className="btn btn-secondary mb-3"
      >
        Pembayaran
      </Link>
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
            {editUser ? (
              <input
                type="text"
                className="form-control w-25"
                id="name"
                name="name"
                placeholder="Nama Lengkap"
                defaultValue={user.data_user.name}
                onChange={handleInputUserChange}
                required
              />
            ) : (
              <strong>
                {user.data_user.name === null
                  ? user.data.name
                  : user.data_user.name}
              </strong>
            )}
          </h1>
          {isRegistered ? (
            <>
              <h1 className="text-left" style={{ fontSize: "24px" }}>
                {editUser ? (
                  <select
                    className="form-select w-25"
                    id="jurusan"
                    name="jurusan"
                    onChange={handleInputUserChange}
                    defaultValue={user.data_user.jurusan}
                    required
                  >
                    <option value="Bahasa">Bahasa</option>
                    <option value="IPS">IPS</option>
                    <option value="IPA">IPA</option>
                  </select>
                ) : (
                  <strong>{user.data_user.jurusan}</strong>
                )}
              </h1>
              <p className="text-left" style={{ fontSize: "18px" }}>
                Status Pendaftaran : <strong> {user.data_user.status}</strong>
              </p>
              <ModalChangePhoto
                id={user.data_user.id_data_user}
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
        <h3>
          Data Diri{" "}
          <div className="btn btn-primary py-1 mb-1" onClick={handleUserEdit}>
            <FaEdit className="mb-1" /> Edit
          </div>
        </h3>
        <form onSubmit={handleFormUserSubmit}>
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
                    {editUser ? (
                      <input
                        type="date"
                        className="form-control"
                        id="tanggallahir"
                        name="tanggallahir"
                        defaultValue={user.data_user.tanggallahir}
                        onChange={handleInputUserChange}
                        required
                      />
                    ) : (
                      <p>
                        {new Date(
                          user.data_user.tanggallahir
                        ).toLocaleDateString("id-ID")}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <strong>Tempat Lahir:</strong>
                    {editUser ? (
                      <select
                        className="form-select"
                        id="tempatlahir"
                        name="tempatlahir"
                        defaultValue={user.data_user.tempatlahir}
                        onChange={handleInputUserChange}
                        required
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.data_user.tempatlahir}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <strong>Agama:</strong>
                    {editUser ? (
                      <select
                        className="form-select"
                        id="agama"
                        name="agama"
                        defaultValue={user.data_user.agama}
                        onChange={handleInputUserChange}
                        required
                      >
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katholik">Katholik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    ) : (
                      <p>{user.data_user.agama}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <strong>Jenis Kelamin:</strong>
                    {editUser ? (
                      <select
                        className="form-select"
                        id="jeniskelamin"
                        name="jeniskelamin"
                        defaultValue={user.data_user.jenis_kelamin}
                        onChange={handleInputUserChange}
                        required
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    ) : (
                      <p>{user.data_user.jenis_kelamin}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <strong>Alamat:</strong>
                    {editUser ? (
                      <textarea
                        className="form-control"
                        id="alamat"
                        name="alamat"
                        defaultValue={user.data_user.alamat}
                        onChange={handleInputUserChange}
                        required
                      />
                    ) : (
                      <p>{user.data_user.alamat}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>RT:</strong>
                        {editUser ? (
                          <input
                            type="number"
                            className="form-control"
                            id="rt"
                            name="rt"
                            defaultValue={user.data_user.rt}
                            onChange={handleInputUserChange}
                            required
                          />
                        ) : (
                          <p>{user.data_user.rt}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>RW:</strong>
                        {editUser ? (
                          <input
                            type="number"
                            className="form-control"
                            id="rw"
                            name="rw"
                            defaultValue={user.data_user.rw}
                            onChange={handleInputUserChange}
                            required
                          />
                        ) : (
                          <p>{user.data_user.rw}</p>
                        )}
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
                    {editUser ? (
                      <input
                        type="text"
                        className="form-control"
                        id="no_telp"
                        name="no_telp"
                        defaultValue={user.data_user.no_telp}
                        onChange={handleInputUserChange}
                        required
                      />
                    ) : (
                      <p>{user.data_user.no_telp}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <strong>Provinsi:</strong>
                    {editUser ? (
                      <select
                        className="form-select"
                        id="provinsi"
                        name="provinsi"
                        defaultValue={user.data_user.provinsi}
                        onChange={handleInputUserChange}
                        required
                      >
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.data_user.provinsi}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Kabupaten/Kota:</strong>
                        {editUser ? (
                          <input
                            type="text"
                            className="form-control"
                            id="kota"
                            name="kota"
                            placeholder="Kabupaten/Kota"
                            defaultValue={user.data_user.kota}
                            onChange={handleInputUserChange}
                            required
                          />
                        ) : (
                          <p>{user.data_user.kota}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Kecamatan:</strong>
                        {editUser ? (
                          <input
                            type="text"
                            className="form-control"
                            id="kecamatan"
                            name="kecamatan"
                            placeholder="Kecamatan"
                            defaultValue={user.data_user.kecamatan}
                            onChange={handleInputUserChange}
                            required
                          />
                        ) : (
                          <p>{user.data_user.kecamatan}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Kelurahan/Desa:</strong>
                        {editUser ? (
                          <input
                            type="text"
                            className="form-control"
                            id="kelurahan"
                            name="kelurahan"
                            placeholder="Kelurahan/Desa"
                            defaultValue={user.data_user.kelurahan}
                            onChange={handleInputUserChange}
                            required
                          />
                        ) : (
                          <p>{user.data_user.kelurahan}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Kode Pos:</strong>
                        {editUser ? (
                          <input
                            type="number"
                            className="form-control"
                            id="kode_pos"
                            name="kode_pos"
                            placeholder="Kode Pos"
                            defaultValue={user.data_user.kode_pos}
                            onChange={handleInputUserChange}
                            required
                          />
                        ) : (
                          <p>{user.data_user.kode_pos}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Asal SMP:</strong>
                    {editUser ? (
                      <input
                        type="text"
                        className="form-control"
                        id="asal_smp"
                        name="asal_smp"
                        defaultValue={user.data_user.asal_smp}
                        onChange={handleInputUserChange}
                        required
                      />
                    ) : (
                      <p>{user.data_user.asal_smp}</p>
                    )}
                  </div>
                  {editUser && (
                    <button
                      type="submit"
                      className="btn shadow-sm w-100"
                      style={{ backgroundColor: "#CCFFD1" }}
                      disabled={loading}
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
        <hr />
        {isRegistered && (
          <>
            <h3>
              Data {jenisOrtu}{" "}
              <div className="btn btn-primary py-1 mb-1">
                <FaEdit className="mb-1" /> Edit
              </div>
            </h3>
            <div className="row">
              <div className="col-md-6 border-end">
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>RT:</strong>
                      <p>{ortu.rt}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>RW:</strong>
                      <p>{ortu.rw}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Nomor Telepon:</strong>
                    <p>{ortu.no_telp}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Provinsi:</strong>
                  <p>{ortu.provinsi}</p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kabupaten/Kota:</strong>
                      <p>{ortu.kota}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kecamatan:</strong>
                      <p>{ortu.kecamatan}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kelurahan/Desa:</strong>
                      <p>{ortu.kelurahan}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
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
            <h3>
              Ijazah
              <ModalChangeIjazah
                id={user.data_user.id_data_user}
                onClose={refreshProfile}
              />
            </h3>
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
