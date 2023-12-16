# UAS Pemrograman Web Gasal 2023 / 2024

# Kelas A Kelompok 2

## Anggota Kelompok :
- Nico Herlim (210711227) - Full Stack dev
- Michael Wahyu Kristian (210711254) - AFK
- Kristina Adine Mustika Arnalda (210711102) - AFK

## Username & Password Login :
- Login User :
  - Username : PW2023
  - Password : PEMROGRAMANWEB2023
- Login Admin :
  - Username : admin
  - Password : admin

## Bonus yang diambil :
- Hosting :
  - Backend : https://tugasbesarpw2.azurewebsites.net/
  - Frontend : https://tugas-besar-pw-ppdb-react.vercel.app/
- Routes API:
  - User:
    - POST /api/register - Daftarkan Pengguna
    - POST /api/login - Masuk Pengguna
    - POST /api/logout - Keluar Pengguna
    - GET /api/user - Dapatkan informasi pengguna yang terautentikasi
    - GET /api/user/{id} - Dapatkan informasi pengguna berdasarkan ID
    - PUT /api/user/{id} - Perbarui informasi pengguna berdasarkan ID
    - DELETE /api/user/{id} - Hapus pengguna berdasarkan ID

  - Data Ayah:
    - GET /api/data-ayah - Dapatkan semua data ayah
    - POST /api/data-ayah - Tambahkan data ayah baru
    - GET /api/data-ayah/{id} - Dapatkan data ayah berdasarkan ID
    - PUT /api/data-ayah/{id} - Perbarui data ayah berdasarkan ID
    - DELETE /api/data-ayah/{id} - Hapus data ayah berdasarkan ID

  - Data Ibu:
    - GET /api/data-ibu - Dapatkan semua data ibu
    - POST /api/data-ibu - Tambahkan data ibu baru
    - GET /api/data-ibu/{id} - Dapatkan data ibu berdasarkan ID
    - PUT /api/data-ibu/{id} - Perbarui data ibu berdasarkan ID
    - DELETE /api/data-ibu/{id} - Hapus data ibu berdasarkan ID

  - Data Wali:
    - GET /api/data-wali - Dapatkan semua data wali
    - POST /api/data-wali - Tambahkan data wali baru
    - GET /api/data-wali/{id} - Dapatkan data wali berdasarkan ID
    - PUT /api/data-wali/{id} - Perbarui data wali berdasarkan ID
    - DELETE /api/data-wali/{id} - Hapus data wali berdasarkan ID

  - Data Pengguna:
    - GET /api/data-user - Dapatkan semua data pengguna
    - POST /api/data-user - Tambahkan pengguna baru
    - POST /api/data-user/accept/{id} - Terima pengguna berdasarkan ID
    - GET /api/data-user/{id} - Dapatkan data pengguna berdasarkan ID
    - PUT /api/data-user/{id} - Perbarui data pengguna berdasarkan ID
    - PUT /api/data-user/updateBerkas/{id} - Perbarui dokumen pengguna berdasarkan ID
    - DELETE /api/data-user/{id} - Hapus pengguna berdasarkan ID
    - PUT /api/data-user/updateProfile/{id} - Perbarui profil pengguna berdasarkan ID
    - PUT /api/data-user/updateIjazah/{id} - Perbarui sertifikat pendidikan pengguna berdasarkan ID

  - Pembayaran:
    - GET /api/pembayaran - Dapatkan semua data pembayaran
    - POST /api/pembayaran - Buat pembayaran baru
    - GET /api/pembayaran/{id} - Dapatkan data pembayaran berdasarkan ID
    - PUT /api/pembayaran/{id} - Perbarui data pembayaran berdasarkan ID
    - PUT /api/pembayaran/updateTagihan/{id} - Perbarui tagihan pembayaran berdasarkan ID
    - DELETE /api/pembayaran/{id} - Hapus pembayaran berdasarkan ID
    - GET /api/pembayaran/user/{id} - Dapatkan pembayaran berdasarkan ID pengguna
    - GET /api/pembayaran/history/{id} - Dapatkan riwayat pembayaran berdasarkan ID pengguna
    - PUT /api/pembayaran/finish/{id} - Tandai status pembayaran sebagai selesai berdasarkan ID
    - PUT /api/pembayaran/cancel/{id} - Batalkan status pembayaran berdasarkan ID
    - POST /api/pembayaran/all - Buat pembayaran untuk semua pengguna
- React :
  - Link Repository : https://github.com/byonicku/PW2023_A_2_React/
