import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import APIPembayaran from "../../api/APIPembayaran";
import { toast } from "sonner";
import { FaEdit } from "react-icons/fa";

const ModalEditPembayaran = ({ data, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(
    {
      id_pembayaran: data.id_pembayaran,
      nama_tagihan: data.nama_tagihan,
      tanggal_awal: data.tanggal_awal,
      tanggal_akhir: data.tanggal_akhir,
      jumlah_pembayaran: data.jumlah_pembayaran,
      denda : data.denda,
    }
  );

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

    if (formData.tanggal_awal > formData.tanggal_akhir) {
      setError("Tanggal awal tidak boleh lebih besar dari tanggal akhir!");
      return;
    }

    await editPembayaranQuery.mutateAsync(formData);

    handleClose();
  };

  const editPembayaranQuery = useMutation({
    mutationFn: (data) => APIPembayaran.editPembayaran(data, data.id_pembayaran),
    onSuccess: (data) => {
      onClose();
      console.log(data);
      toast.success("Pembayaran berhasil diubah!");
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
      toast.error(error.message);
    },
  });

  return (
    <>
      <Button variant="info" className="ms-1" onClick={() => setShowModal(true)}>
        <FaEdit className="mb-1 me-1"/>
        Edit
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Tagihan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nama_tagihan">
              <Form.Label>Nama Tagihan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Tagihan"
                defaultValue={formData.nama_tagihan}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="tanggal_awal">
              <Form.Label>Tanggal Awal</Form.Label>
              <Form.Control
                type="date"
                defaultValue={formData.tanggal_awal}
                onChange={handleInputChange}
                onKeyDown={(e) => e.preventDefault()}
                required
              />
            </Form.Group>

            <Form.Group controlId="tanggal_akhir">
              <Form.Label>Tanggal Akhir</Form.Label>
              <Form.Control
                type="date"
                disabled={formData.tanggal_awal === "" || formData.tanggal_awal > formData.tanggal_akhir}
                min={formData.tanggal_awal}
                defaultValue={formData.tanggal_akhir}
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
                defaultValue={formData.jumlah_pembayaran}
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
                defaultValue={formData.denda}
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

export default ModalEditPembayaran;
