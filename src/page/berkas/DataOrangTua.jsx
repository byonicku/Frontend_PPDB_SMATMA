import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { cities, provinces } from "../../constant/input_constant.jsx";
import { useLocation } from "react-router-dom";

function DataOrangTua() {
  const { state } = useLocation();
  
  const [formData, setFormData] = useState({
    name: "",
    jenis_kelamin: "",
    tempatlahir: "",
    agama: "",
    no_telp: "",
    alamat: "",
    rt: "",
    rw: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    kode_pos: "",
    pendidikan_terakhir: "",
    pekerjaan: "",
    penghasilan: "",
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary form submission logic
    console.log("Form submitted:", formData);
  };



  return (
    <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Step 2 of 2</h4>
            <h5>Data Orang Tua</h5>
          </div>
          <div className="col-md-6">
            <div
              className="alert alert-warning d-flex align-items-center"
              role="alert"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} className="pe-2" />
              Pastikan data yang dimasukkan sudah benar!
            </div>
          </div>
        </div>
      <div className="row mt-2 mb-5">
        <div className="card w-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <h5>{state.dataDiri.pick}</h5>
                <div className="col-md-6 border-end">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Nama Lengkap"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="jenis_kelamin" className="form-label">
                      Jenis Kelamin
                    </label>
                    <select
                      className="form-select"
                      id="jenis_kelamin"
                      name="jenis_kelamin"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="Jenis Kelamin">
                        Jenis Kelamin
                      </option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tempatlahir" className="form-label">
                      Tempat Lahir
                    </label>
                    <select
                      className="form-select"
                      id="tempatlahir"
                      name="tempatlahir"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="Pilih Tempat Lahir">
                        Pilih Tempat Lahir
                      </option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="agama" className="form-label">
                      Agama
                    </label>
                    <select
                      className="form-select"
                      id="agama"
                      name="agama"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="Pilih Agama">
                        Pilih Agama
                      </option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katholik">Katholik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="no_telp" className="form-label">
                      Nomor Telepon
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="no_telp"
                      name="no_telp"
                      placeholder="Nomor Telepon"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="alamat" className="form-label">
                      Alamat
                    </label>
                    <textarea
                      className="form-control"
                      id="alamat"
                      name="alamat"
                      rows="3"
                      placeholder="Alamat"
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="rt" className="form-label">
                          RT
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="rt"
                          name="rt"
                          placeholder="RT"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="rw" className="form-label">
                          RW
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="rw"
                          name="rw"
                          placeholder="RW"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="provinsi" className="form-label">
                      Provinsi
                    </label>
                    <select
                      className="form-select"
                      id="provinsi"
                      name="provinsi"
                      onChange={handleInputChange}
                      required
                    >
                      <option defaultValue="Pilih Provinsi" hidden>
                        Pilih Provinsi
                      </option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="kota" className="form-label">
                          Kabupaten/Kota
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="kota"
                          name="kota"
                          placeholder="Kabupaten/Kota"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="kecamatan" className="form-label">
                          Kecamatan
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="kecamatan"
                          name="kecamatan"
                          placeholder="Kecamatan"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="kelurahan" className="form-label">
                          Kelurahan/Desa
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="kelurahan"
                          name="kelurahan"
                          placeholder="Kelurahan/Desa"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="kode_pos" className="form-label">
                          Kode Pos
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="kode_pos"
                          name="kode_pos"
                          placeholder="Kode Pos"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="asal_smp" className="form-label">
                      Asal SMP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="asal_smp"
                      name="asal_smp"
                      placeholder="Asal SMP"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="pendidikan_terakhir" className="form-label">
                      Pendidikan Terakhir
                    </label>
                    <select
                      className="form-select"
                      id="pendidikan_terakhir"
                      name="pendidikan_terakhir"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="">
                        Pilih Pendidikan Terakhir
                      </option>
                      <option value="SD">SD</option>
                      <option value="SLTP">SLTP</option>
                      <option value="SLTA">SLTA</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="pekerjaan" className="form-label">
                      Pekerjaan
                    </label>
                    <select
                      className="form-select"
                      id="pekerjaan"
                      name="pekerjaan"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="">
                        Pilih Pekerjaan
                      </option>
                      <option value="PNS">Pegawai Negeri Sipil</option>
                      <option value="Swasta">Karyawan Swasta</option>
                      <option value="Wiraswasta">Wiraswasta</option>
                      <option value="Guru / Dosen">Guru / Dosen</option>
                      <option value="Dokter">Dokter</option>
                      <option value="Perawat">Perawat</option>
                      <option value="TNI/Polri">TNI/Polri</option>
                      <option value="Wiraswasta">Wiraswasta</option>
                      <option value="Pengusaha">Pengusaha</option>
                      <option value="Penyiar">Penyiar</option>
                      <option value="Polisi">Polisi</option>
                      <option value="Peternak">Peternak</option>
                      <option value="Pensiunan">Pensiunan</option>
                      <option value="Buruh Lepas">Buruh Lepas</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="penghasilan" className="form-label">
                      Penghasilan
                    </label>
                    <select
                      className="form-select"
                      id="penghasilan"
                      name="penghasilan"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="">
                        Pilih Penghasilan
                      </option>
                      <option value="< Rp. 1.000.000"> Rp. 1.000.000</option>
                      <option value="Rp 1.000.000 - Rp. 3.000.000">
                        Rp 1.000.000 - Rp. 3.000.000
                      </option>
                      <option value="Rp 3.000.000 - Rp. 5.000.000">
                        Rp 3.000.000 - Rp. 5.000.000
                      </option>
                      <option value="Rp 5.000.000 - Rp. 7.000.000">
                        Rp 5.000.000 - Rp. 7.000.000
                      </option>
                      <option value="> Rp 7.000.000"> Rp. 7.000.000</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn shadow-sm w-100"
                    style={{ backgroundColor: "#CCFFD1" }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataOrangTua;
