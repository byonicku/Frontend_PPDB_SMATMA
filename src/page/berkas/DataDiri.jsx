import React, { useState } from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cities, provinces } from "../../constant/input_constant.jsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import getUser from "../../api/UserHandler.jsx";

const DataDiri = () => {
  const [formData, setFormData] = useState({
    name: "",
    jenis_kelamin: "",
    tanggallahir: "",
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
    asal_smp: "",
    jurusan: "",
    foto: null,
    ijazah: null,
    status: "Pending",
    id_user: JSON.parse(getUser()).data.id_user,
  });

  const isFormValid = () => {
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        return false;
      }
    }
    return true;
  };

  const [pick, setPick] = useState("");

  const handlePick = (e) => {
    setPick(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    if (!isFormValid()) {
        e.preventDefault();
        toast.error("Mohon isi semua data!");
        return;
    }

    if (formData.foto === null || formData.ijazah === null) {
        e.preventDefault();
        toast.error("Mohon upload foto dan ijazah!");
        return;
    }
    
    if (pick === "") {
        e.preventDefault();
        toast.error("Mohon pilih data orang tua yang ingin di-input!");
        return;
    }

    if (formData.foto !== null && formData.foto.size > 256000) {
        e.preventDefault();
        toast.error("Ukuran foto tidak boleh lebih dari 250KB!");
        return;
    }

    if (formData.ijazah !== null && formData.ijazah.size > 512000) {
        e.preventDefault();
        toast.error("Ukuran ijazah tidak boleh lebih dari 500KB!");
        return;
    }

    if (formData.kode_pos.length > 5) {
        e.preventDefault();
        toast.error("Kode Pos hanya boleh 5 digit kebawah!");
        return;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <h4>Step 1 of 2</h4>
          <h5>Data Diri</h5>
        </div>
        <div className="col-md-12 col-lg-6">
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
              <div className="row">
                <div className="col-md-12 col-lg-6 border-end">
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
                    <label htmlFor="tanggallahir" className="form-label">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="tanggallahir"
                      name="tanggallahir"
                      placeholder="Tanggal Lahir"
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.preventDefault()}
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
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
                        <option key={city} value={city}>{city}</option>
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
                      type="tel"
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
                    <div className="col-md-12 col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="rt" className="form-label">
                          RT
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="rt"
                          name="rt"
                          placeholder="RT"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="rw" className="form-label">
                          RW
                        </label>
                        <input
                          type="number"
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

                <div className="col-md-12 col-lg-6">
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
                    <div className="col-md-12 col-lg-6">
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
                    <div className="col-md-12 col-lg-6">
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
                    <div className="col-md-12 col-lg-6">
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
                    <div className="col-md-12 col-lg-6">
                      <div className="mb-3">
                        <label htmlFor="kode_pos" className="form-label">
                          Kode Pos
                        </label>
                        <input
                          type="number"
                          maxLength={5}
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
                    <label htmlFor="jurusan" className="form-label">
                      Jurusan
                    </label>
                    <select
                      className="form-select"
                      id="jurusan"
                      name="jurusan"
                      onChange={handleInputChange}
                      required
                    >
                      <option hidden defaultValue="">
                        Pilih Jurusan
                      </option>
                      <option value="Bahasa">Bahasa</option>
                      <option value="IPS">IPS</option>
                      <option value="IPA">IPA</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="foto" className="form-label">
                      Upload Pas Foto (max size : 250kb)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      id="foto"
                      name="foto"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ijazah" className="form-label">
                      Upload Ijazah SMP (max size : 500kb)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      id="ijazah"
                      name="ijazah"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Pilih Data Orang Tua Yang Ingin Di-input
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="choose"
                        id="chooseAyah"
                        defaultValue="Ayah"
                        onChange={handlePick} 
                        required
                      />
                      <label className="form-check-label" htmlFor="chooseAyah">
                        Ayah
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="choose"
                        id="chooseIbu"
                        defaultValue="Ibu"
                        onChange={handlePick}
                        required
                      />
                      <label className="form-check-label" htmlFor="chooseIbu">
                        Ibu
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="choose"
                        id="chooseWali"
                        defaultValue="Wali"
                        onChange={handlePick}
                        required
                      />
                      <label className="form-check-label" htmlFor="chooseWali">
                        Wali
                      </label>
                    </div>
                  </div>
                  <hr />
                  <Link
                    onClick={handleSubmit}
                    to={'/berkas/data-orang-tua'}
                    state={{content: { formData, pick }}}
                    type="submit"   
                    className="btn shadow-sm w-100"
                    style={{ backgroundColor: "#CCFFD1" }}
                  >
                    Next
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDiri;
