import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import APIPembayaran from "../../api/APIPembayaran";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import getUser from "../../api/UserHandler";

const ModalPembayaran = ({ id, tanggal_awal, tanggal_akhir, onClose }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    nama_pengirim: "",
    tanggal_bayar: "",
    metode_pembayaran: "",
    bukti_pembayaran: null,
    id_user: JSON.parse(getUser()).data.id_user,
  });

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      nama_pengirim: "",
      tanggal_bayar: "",
      metode_pembayaran: "",
      bukti_pembayaran: null,
    });
    setError(null);
    onClose();
  } 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]: files[0],
    });
  };

  const isFormValid = () => {
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = async () => {
    if (!isFormValid()) {
        setError("Semua field harus diisi!");
        return;
    }

    await pembayaranQuery.mutateAsync(formData);

    handleClose();
  };

  const pembayaranQuery = useMutation({
    mutationFn: (data) => APIPembayaran.bayarPembayaran(data, id),
    onSuccess: (data) => {
      onClose();
      toast.success("Pembayaran berhasil dibayar! Silahkan menunggu admin untuk verifikasi");
      setTimeout(() => {
        navigate("/pembayaran");
      }, 500);
      setError(null);
    },
    onError: (error) => {
      setError(error.data.message);
      toast.error(error.data.message);
    },
  });

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Bayar
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nama_pengirim">
              <Form.Label>Nama Rekening Pengirim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Rekening Pengirim"
                value={formData.nama_rekening}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="tanggal_bayar">
              <Form.Label>Tanggal Bayar</Form.Label>
              <Form.Control
                type="date"
                value={formData.tanggal_bayar}
                min={tanggal_awal}
                max={tanggal_akhir}
                onChange={handleInputChange}
                onKeyDown={(e) => e.preventDefault()}
                required
              />
            </Form.Group>

            <Form.Group controlId="metode_pembayaran">
              <Form.Label>Metode Pembayaran</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Pilih Metode Pembayaran"
                onChange={handleInputChange}
                required
              >
                <option hidden disabled>
                    Pilih Metode Pembayaran
                </option>
                <option>Transfer Bank</option>
                <option>Kartu Kredit</option>
                <option>Virtual Account</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="bukti_pembayaran">
              <Form.Label>Upload Bukti Pembayaran</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} accept="image/*" required/>
            </Form.Group>
          </Form>
            {error && (
                <div className="alert alert-danger mt-2" role="alert">
                  {error}
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPembayaran;
