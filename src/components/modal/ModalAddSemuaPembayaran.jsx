import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import APIPembayaran from "../../api/APIPembayaran";
import { toast } from "sonner";

const ModalAddSemuaPembayaran = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    nama_tagihan: "",
    tanggal_awal: "",
    tanggal_akhir: "",
    jumlah_pembayaran: 0,
    denda : 0,
  });

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      nama_tagihan: "",
      tanggal_awal: "",
      tanggal_akhir: "",
      jumlah_pembayaran: 0,
      denda : 0,
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

  const isFormValid = () => {
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null || formData[key] === 0) {
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

    if (formData.tanggal_awal > formData.tanggal_akhir) {
      setError("Tanggal awal tidak boleh lebih besar dari tanggal akhir!");
      return;
    }

    await addPembayaranSemuaQuery.mutateAsync(formData);

    handleClose();
  };

  const addPembayaranSemuaQuery = useMutation({
    mutationFn: (data) => APIPembayaran.tambahSemuaPembayaran(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Pembayaran berhasil ditambahkan ke semua user!");
      setError(null);
    },
    onError: (error) => {
      setError(error.data.message);
      toast.error(error.data.message);
    },
  });

  return (
    <>
      <Button variant="success" onClick={() => setShowModal(true)}>
        Tambah Tagihan Semua
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Tagihan Semua</Modal.Title>
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

export default ModalAddSemuaPembayaran;
