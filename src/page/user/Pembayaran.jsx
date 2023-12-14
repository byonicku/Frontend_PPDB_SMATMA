import { useState } from 'react';
import ModalPembayaran from '../../components/modal/ModalPembayaran';

const Pembayaran = () => {
    const refreshPembayaran = () => {
        // Add your logic to refresh the data here
        console.log("Refreshing data...");
    };
  const [billingData, setBillingData] = useState([
    {
      id: 1,
      name: 'Tagihan 1',
      startDate: '2023-10-01',
      endDate: '2023-10-31',
      amount: 'Rp 500.00',
    },
    {
      id: 2,
      name: 'Tagihan 2',
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      amount: 'Rp 600.00',
    },
  ]);

  const [paymentHistoryData, setPaymentHistoryData] = useState([
    {
      id: 1,
      name: 'Tagihan 1',
      paymentDate: '2023-10-15',
      paymentMethod: 'Transfer Bank',
      paymentAmount: 'Rp 500.00',
      penaltyAmount: 'Rp 0.00',
    },
    {
      id: 2,
      name: 'Tagihan 2',
      paymentDate: '2023-11-15',
      paymentMethod: 'Kartu Kredit',
      paymentAmount: 'Rp 600.00',
      penaltyAmount: 'Rp 10.00',
    },
  ]);

  return (
    <div className="container mb-3">
      <div className="card">
        <div className="card-header">
          <h4>Tagihan Pembayaran</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Tagihan</th>
                  <th scope="col">Tanggal Awal</th>
                  <th scope="col">Tanggal Akhir</th>
                  <th scope="col">Jumlah Bayar</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {billingData.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.amount}</td>
                    <td>
                      <ModalPembayaran 

                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">
          <h4>History Pembayaran</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Tagihan</th>
                  <th scope="col">Tanggal Bayar</th>
                  <th scope="col">Metode Bayar</th>
                  <th scope="col">Jumlah Bayar</th>
                  <th scope="col">Denda</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistoryData.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.paymentDate}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.paymentAmount}</td>
                    <td>{item.penaltyAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;