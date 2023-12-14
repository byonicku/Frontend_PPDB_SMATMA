import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";

const ModalPembayaran = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    nama_rekening: "",
    tanggal_bayar: "",
    metode_pembayaran: "",
    bukti_pembayaran: null,
  });

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      nama_rekening: "",
      tanggal_bayar: "",
      metode_pembayaran: "",
      bukti_pembayaran: null,
    });
    setError(null);
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

  const handleFormSubmit = () => {
    // Add your logic to handle form submission here
    if (!isFormValid()) {
        setError("Semua field harus diisi!");
        return;
    }

    console.log("Form submitted:", formData);
    // Reset the form data
    setFormData({
      nama_rekening: "",
      tanggal_bayar: "",
      metode_pembayaran: "",
      bukti_pembayaran: null,
    });
    // Close the modal
    handleClose();
  };

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
            <Form.Group controlId="nama_rekening">
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
                onChange={handleInputChange}
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
              <Form.Control type="file" onChange={handleFileChange} required/>
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
