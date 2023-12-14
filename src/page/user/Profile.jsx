import getUser, { berkasInputted } from "../../api/UserHandler";
import default_avatar from "./../../assets/default-avatar.jpg";
import { getPicture } from "../../api/APIConstant";
import './Profile.css';
import ModalChangePhoto from "../../components/modal/ModalChangePhoto";
import { setUser } from "../../api/UserHandler";
import APIMethod from "../../api/APIMethod";
import { useState } from "react";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(getUser()));
  const isRegistered = !berkasInputted();

  const refreshProfile = async () => {
    const id = JSON.parse(getUser()).data.id_user;
    const user = await APIMethod.getUserByID(id);
    delete user.message;
    setUser(JSON.stringify(user));
    setCurrentUser(user);
  }

  return (
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
                id = {currentUser.data_user.id_data_user}
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
          <div className="col-md-6 border-end">
            {isRegistered ? (
              <>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <p>{currentUser.data.email}</p>
                </div>
                <div className="mb-3">
                  <strong>Tanggal Lahir:</strong>
                  <p>{currentUser.data_user.tanggallahir}</p>
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
                  <strong>Alamat:</strong>
                  <p>{currentUser.data_user.alamat}</p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>RT:</strong>
                      <p>{currentUser.data_user.rt}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
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
          <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kabupaten/Kota:</strong>
                      <p>{currentUser.data_user.kota}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kecamatan:</strong>
                      <p>{currentUser.data_user.kecamatan}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Kelurahan/Desa:</strong>
                      <p>{currentUser.data_user.kelurahan}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
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
            {currentUser.wali ? (
              <>
                <h3>Data Wali</h3>
                <div className="row">
                  <div className="col-md-6 border-end">
                    <div className="mb-3">
                      <strong>Nama Lengkap:</strong>
                      <p>{currentUser.wali.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <p>{currentUser.wali.tempatlahir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Agama:</strong>
                      <p>{currentUser.wali.agama}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <p>{currentUser.wali.alamat}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RT:</strong>
                          <p>{currentUser.wali.rt}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RW:</strong>
                          <p>{currentUser.wali.rw}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>Nomor Telepon:</strong>
                        <p>{currentUser.wali.no_telp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Provinsi:</strong>
                      <p>{currentUser.wali.provinsi}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kabupaten/Kota:</strong>
                          <p>{currentUser.wali.kota}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kecamatan:</strong>
                          <p>{currentUser.wali.kecamatan}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kelurahan/Desa:</strong>
                          <p>{currentUser.wali.kelurahan}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kode Pos:</strong>
                          <p>{currentUser.wali.kode_pos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Pendidikan Terakhir:</strong>
                      <p>{currentUser.wali.pendidikan_terakhir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <p>{currentUser.wali.pekerjaan}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Penghasilan:</strong>
                      <p>{currentUser.wali.penghasilan}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : currentUser.ibu ? (
              <>
                <h3>Data Ibu</h3>
                <div className="row">
                <div className="col-md-6 border-end">
                    <div className="mb-3">
                      <strong>Nama Lengkap:</strong>
                      <p>{currentUser.ibu.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <p>{currentUser.ibu.tempatlahir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Agama:</strong>
                      <p>{currentUser.ibu.agama}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <p>{currentUser.ibu.alamat}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RT:</strong>
                          <p>{currentUser.ibu.rt}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RW:</strong>
                          <p>{currentUser.ibu.rw}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>Nomor Telepon:</strong>
                        <p>{currentUser.ibu.no_telp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Provinsi:</strong>
                      <p>{currentUser.ibu.provinsi}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kabupaten/Kota:</strong>
                          <p>{currentUser.ibu.kota}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kecamatan:</strong>
                          <p>{currentUser.ibu.kecamatan}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kelurahan/Desa:</strong>
                          <p>{currentUser.ibu.kelurahan}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kode Pos:</strong>
                          <p>{currentUser.ibu.kode_pos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Pendidikan Terakhir:</strong>
                      <p>{currentUser.ibu.pendidikan_terakhir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <p>{currentUser.ibu.pekerjaan}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Penghasilan:</strong>
                      <p>{currentUser.ibu.penghasilan}</p>
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
                      <p>{currentUser.ayah.name}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tempat Lahir:</strong>
                      <p>{currentUser.ayah.tempatlahir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Agama:</strong>
                      <p>{currentUser.ayah.agama}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Alamat:</strong>
                      <p>{currentUser.ayah.alamat}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RT:</strong>
                          <p>{currentUser.ayah.rt}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>RW:</strong>
                          <p>{currentUser.ayah.rw}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>Nomor Telepon:</strong>
                        <p>{currentUser.ayah.no_telp}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Provinsi:</strong>
                      <p>{currentUser.ayah.provinsi}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kabupaten/Kota:</strong>
                          <p>{currentUser.ayah.kota}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kecamatan:</strong>
                          <p>{currentUser.ayah.kecamatan}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kelurahan/Desa:</strong>
                          <p>{currentUser.ayah.kelurahan}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <strong>Kode Pos:</strong>
                          <p>{currentUser.ayah.kode_pos}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Pendidikan Terakhir:</strong>
                      <p>{currentUser.ayah.pendidikan_terakhir}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Pekerjaan:</strong>
                      <p>{currentUser.ayah.pekerjaan}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Penghasilan:</strong>
                      <p>{currentUser.ayah.penghasilan}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
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
  );
};
export default Profile;
