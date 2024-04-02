import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import APIPembayaran from "../../api/APIPembayaran";
import { toast } from "sonner";
import { FaEye } from "react-icons/fa";
import { getPicture } from "../../api/APIConstant";

const ModalLihatPembayaran = ({ data, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setError(null);
    onClose();
  };

  const handleAccept = async () => {
    await acceptPembayaranQuery.mutateAsync(data);

    handleClose();
  };

  const handleReject = async () => {
    await rejectPembayaranQuery.mutateAsync(data);

    handleClose();
  };

  const acceptPembayaranQuery = useMutation({
    mutationFn: (data) => APIPembayaran.acceptPembayaran(data.id_pembayaran),
    onSuccess: (data) => {
      onClose();
      toast.success("Pembayaran berhasil diterima!");
      setError(null);
    },
    onError: (error) => {
      setError(error.data);
      toast.error(error.data);
    },
  });

  const rejectPembayaranQuery = useMutation({
    mutationFn: (data) => APIPembayaran.rejectPembayaran(data.id_pembayaran),
    onSuccess: (data) => {
      onClose();
      toast.success("Pembayaran berhasil ditolak!");
      setError(null);
    },
    onError: (error) => {
      setError(error.data);
      toast.error(error.data);
    },
  });

  return (
    <>
      <Button variant="success" onClick={() => setShowModal(true)}>
        <FaEye className="mb-1 me-1" />
        Lihat Detail
      </Button>
      <Modal show={showModal} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Tagihan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.status_pembayaran === "Ditolak" ? (
            <div className="alert alert-danger">
              Pembayaran ini ditolak oleh admin!
            </div>
          ) : data.status_pembayaran === "Belum Lunas" ? (
            <div className="alert alert-warning">
              Pembayaran ini belum dibayar oleh user!
            </div>
          ) : (
            <>
              <div className="row">
                <div className="col-md-12 col-lg-6 border-end">
                  <div className="mb-3">
                    <strong>Nama Tagihan:</strong>
                    <p>{data.nama_tagihan}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Tanggal Pembayaran:</strong>
                    <p>
                      {new Date(data.tanggal_bayar).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="mb-3">
                    <strong>Nama Pengirim:</strong>
                    <p>{data.nama_pengirim}</p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="mb-3">
                    <strong>Metode Pembayaran</strong>
                    <p>{data.metode_pembayaran}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Jumlah Pembayaran</strong>
                    <p>
                      {data.jumlah_pembayaran.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                  <div className="mb-3">
                    <strong>Denda</strong>
                    <p>
                      {data.denda.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <strong>Bukti Pembayaran</strong>
                <img
                  src={getPicture(data.bukti_pembayaran)}
                  alt="Bukti Pembayaran"
                  className="img-fluid"
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {data.status_pembayaran !== "Belum Lunas" &&
            data.status_pembayaran !== "Ditolak" && (
              <Button variant="success" onClick={handleAccept}>
                Terima Pembayaran
              </Button>
            )}

          {data.status_pembayaran !== "Belum Lunas" &&
            data.status_pembayaran !== "Ditolak" && (
              <Button variant="danger" onClick={handleReject}>
                Tolak Pembayaran
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalLihatPembayaran;
