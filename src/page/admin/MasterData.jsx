import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIMethod from "../../api/APIMethod";
import { Spinner } from "react-bootstrap";

const MasterData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterUsers(term);  
    setSelectedJurusan("");
  };

  const filterUsers = (term) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const clearFilter = () => {
    setSearchTerm("");
    setSelectedJurusan("");
    setFilteredUsers(users);
  };

  const filterByJurusan = (jurusan) => {
    const filteredByJurusan = users.filter((user) => user.data_users.jurusan === jurusan);
    setFilteredUsers(filteredByJurusan);
    setSelectedJurusan(jurusan);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await APIMethod.getAllUser();

        setUsers(user.data);
        setFilteredUsers(user.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return !loading ? (
    <div className="container pb-5">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <h3>Informasi Pengguna</h3>
            </div>
            <div className="col-md-6">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cari Nama Pengguna"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row py-3">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn shadow-sm"
                style={{ backgroundColor: "#CCFFD1" }}
              >
                Tambah Tagihan Semua
              </button>
            </div>
            <div className="col-md-6 text-end">
              <button
                onClick={() => clearFilter()}
                className={`btn btn-${
                  selectedJurusan === "" ? "primary" : "secondary"
                } ms-1`}
              >
                Semua
              </button>
              <button
                onClick={() => filterByJurusan("Bahasa")}
                className={`btn btn-${
                  selectedJurusan === "Bahasa" ? "primary" : "secondary"
                } ms-1`}
              >
                Bahasa
              </button>
              <button
                onClick={() => filterByJurusan("IPA")}
                className={`btn btn-${
                  selectedJurusan === "IPA" ? "primary" : "secondary"
                } ms-1`}
              >
                IPA
              </button>
              <button
                onClick={() => filterByJurusan("IPS")}
                className={`btn btn-${
                  selectedJurusan === "IPS" ? "primary" : "secondary"
                } ms-1`}
              >
                IPS
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Pengguna</th>
                  <th scope="col">Tanggal Daftar</th>
                  <th scope="col">Status Pendaftaran</th>
                  <th scope="col">Jurusan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id_user}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {user.data_users.name === null
                        ? user.name
                        : user.data_users.name}
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                    <td>{user.data_users.status}</td>
                    <td>
                      {user.data_users.jurusan === null
                        ? "-"
                        : user.data_users.jurusan}
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/masterdata/profile/${user.id_user}`}
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default MasterData;
