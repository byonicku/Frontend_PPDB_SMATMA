import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import APIPembayaran from "../../api/APIPembayaran";
import { toast } from "sonner";

const ModalAddPembayaran = ({ id_user, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nama_tagihan: "",
    tanggal_awal: "",
    tanggal_akhir: "",
    jumlah_pembayaran: 0,
    denda : 0,
    id_user: id_user,
  });

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      nama_tagihan: "",
      tanggal_awal: "",
      tanggal_akhir: "",
      jumlah_pembayaran: 0,
      denda : 0,
      id_user: id_user,
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

  const isFormValid = () => {
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null || formData[key] === 0) {
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      if (!isFormValid()) {
          setError("Semua field harus diisi!");
          return;
      }

      if (formData.tanggal_awal > formData.tanggal_akhir) {
        setError("Tanggal awal tidak boleh lebih besar dari tanggal akhir!");
        return;
      }

      await addPembayaranQuery.mutateAsync(formData);

      handleClose();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }    
  };

  const addPembayaranQuery = useMutation({
    mutationFn: (data) => APIPembayaran.tambahPembayaran(data),
    onSuccess: (data) => {
      onClose();
      toast.success("Pembayaran berhasil ditambahkan!");
      setError(null);
    },
    onError: (error) => {
      setError(error.data);
      toast.error(error.data);
    },
  });

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Tambah Tagihan
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Tagihan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nama_tagihan">
              <Form.Label>Nama Tagihan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Tagihan"
                value={formData.nama_tagihan}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="tanggal_awal">
              <Form.Label>Tanggal Awal</Form.Label>
              <Form.Control
                type="date"
                value={formData.tanggal_awal}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleInputChange}
                onKeyDown={(e) => e.preventDefault()}
                required
              />
            </Form.Group>

            <Form.Group controlId="tanggal_akhir">
              <Form.Label>Tanggal Akhir</Form.Label>
              <Form.Control
                type="date"
                disabled={formData.tanggal_awal === "" || (formData.tanggal_awal > formData.tanggal_akhir && formData.tanggal_akhir !== "")}
                min={formData.tanggal_awal}
                value={formData.tanggal_akhir}
                onChange={handleInputChange}
                onKeyDown={(e) => e.preventDefault()}
                required
              />
            </Form.Group>

            <Form.Group controlId="jumlah_pembayaran">
              <Form.Label>Jumlah Pembayaran</Form.Label>
              <Form.Control
                type="number"
                placeholder="Jumlah Pembayaran"
                onChange={handleInputChange}
                required
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="denda">
              <Form.Label>Denda</Form.Label>
              <Form.Control
                type="number"
                placeholder="Denda"
                onChange={handleInputChange}
                required
              >
              </Form.Control>
            </Form.Group>

          </Form>
            {error && (
                <div className="alert alert-danger mt-2" role="alert">
                  {error}
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit} disabled={loading}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddPembayaran;
