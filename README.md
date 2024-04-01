# WSRS Mobile JKN TEMPLATE

Seperti namanya, ini bukanlah final project, ini hanyalah sebuah tempalate dasar yang dapat digunakan sebagai acuan untuk membuat RestAPI WSRS Mobile JKN.

Dalam project ini sudah mencangkup semua fitur yg diperlukan dalam WSRS sesuai dengan kebutuhan di website Trust Mark BPJS Kesehatan.

Apabila kalian ingin menggunakan project ini, ada beberapa hal yang harus disesuaikan, seperti:

1. Sesuaikan kebutuhan model yang ada pada folder `src\Models` dengan database SimRS yang ada di masing-masing rumah sakit. Applikasi ini menggunakan mysql2 dan Sequelize sebagai ORMnya.
2. Sesuaikan process dan kebutuhan data yang ada pada folder `src\Controllers` dan `src\Service`, karena ke dua folder ini berkaitan satu sama lain.

# Requirement

* MYSQL (> 8.0) / MariaDB (> 10.3) sesuai dengan dokumentasi ![sequelize database compatibility](https://sequelize.org/releases/)
* NodeJS (tested in v20.10.0) and nodemon
* TypeScript

# Installation

## Jangan dihubungkan dengan database utama Rumah Sakit selama proses development / testing

* Buat database baru dengan nama `wsrs_bpjs` untuk testing sebelum kalian menghubungkannya dengan database utama rumah sakit
* Clone project ini kemudian ketik `npm i` di cmd untuk menginstall semua dependency.
* Buat atau rename `.env-test` menjadi `.env` kemudian sesuaikan kebutuhan data yang ada didalam filenya.
* Ketik `npm run bpjs:dev` untuk menjalankan applikasi

# List URL

| Method | URL                   | Description |
| :----: |:---                   |:--                                                                 |
| GET    | http://localhost:8888 | Main Page / Base Url                                               |
| GET    | /auth                 | Login untuk mendapatkan jwt token                                  |
| POST   | /antrean              | Create antrian kunjungan baru pasien                               |
| POST   | /antrean/status       | Untuk melihat status antrean kunjungan pasien                      |
| POST   | /antrean/sisa         | Untuk melihat sisa antrean pasien                                  |
| POST   | /antrean/batal        | Untuk membatalkan revesvasi kunjungan pasien selama belum check in |
| POST   | /antrean/checkin      | Untuk melakukan check in                                           |
| POST   | /operasi/rs           | Untuk menampilkan list jadwal operasi di Rumah Sakit               |
| POST   | /operasi/peserta      | Untuk menampilkan jadwal operasi pasien Mobile JKN                 |
| POST   | /farmasi              | Untuk mengambil antrian resep                                      |
| POST   | /farmasi/status       | Untuk melihat status antrian resep pasien saat ini                 |
