import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import APIMethod from "../../api/APIMethod";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */

// ku males convert ke react-bootstrap tp karena ribet setup nya jadi ku giniin :v

const ModalChangePhoto = ({ onClose }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [foto, setFoto] = useState({ foto: null });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setLoading(false);
    setError(null);
    onClose();
  };

  const handleShow = () => setShowModal(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto({ ...foto, foto: null });
  };

  const profilePicQuery = useMutation({
    mutationFn: (data) => APIMethod.updateProfilePicture(data),
    onSuccess: (data) => {
      onClose();
      toast.success("Foto berhasil diubah!");
      setTimeout(() => {
        navigate("/profile");
      }, 500);
      setLoading(false);
      setFoto({ ...foto, foto: null });
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (data.foto.name === '') {
      setError("Foto tidak boleh kosong!");
      return;
    }

    await profilePicQuery.mutateAsync(data);
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaEdit className="mb-1" /> Ubah Pas Foto
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Pas Foto</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="foto"
                name="foto"
                onChange={handleFileChange}
              />
              {error && (
                <div className="alert alert-danger mt-2" role="alert">
                  {error}
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <span>Simpan</span>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalChangePhoto;
