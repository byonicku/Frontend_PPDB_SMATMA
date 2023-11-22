import React from 'react';

const Biaya = () => {
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Rincian Biaya</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Jurusan</th>
                        <th>Biaya Pendaftaran</th>
                        <th>SPP per Bulan</th>
                        <th>Biaya Buku</th>
                        <th>Biaya Seragam</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bahasa</td>
                        <td>Rp 100.000</td>
                        <td>Rp 500.000</td>
                        <td>Rp 1.000.000</td>
                        <td>Rp 500.000</td>
                    </tr>
                    <tr>
                        <td>IPA</td>
                        <td>Rp 100.000</td>
                        <td>Rp 600.000</td>
                        <td>Rp 1.200.000</td>
                        <td>Rp 500.000</td>
                    </tr>
                    <tr>
                        <td>IPS</td>
                        <td>Rp 100.000</td>
                        <td>Rp 550.000</td>
                        <td>Rp 1.100.000</td>
                        <td>Rp 500.000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Biaya;
