# WSRS Mobile JKN TEMPLATE

Seperti namanya, ini bukanlah final project, ini hanyalah sebuah tempalate dasar yang dapat digunakan sebagai acuan untuk membuat RestAPI WSRS Mobile JKN.

Dalam project ini sudah mencangkup semua fitur yg diperlukan dalam WSRS sesuai dengan kebutuhan di website Trust Mark BPJS Kesehatan.

Apabila kalian ingin menggunakan project ini, ada beberapa hal yang harus disesuaikan, seperti:

1. Sesuaikan semua model yang ada pada folder `src\Models` dengan database simrs yang ada di masing-masing rumah sakit.
2. Sesuaikan kebutuhan data yang ada pada folder `src\Controllers` dan `src\Service`, karena ke dua folder ini berkaitan erat dengan proses utama WSRS.

# Requirement

* MYSQL (> 8.0) / MariaDB (> 10.3) sesuai dengan dokumentasi ![sequelize database compatibility](https://sequelize.org/releases/)
* NodeJS (tested in v20.10.0)
* TypeScript

# Installation

**Jangan dihubungkan dengan database utama Rumah Sakit**

* Buat database baru dengan nama `wsrs_bpjs` untuk testing sebelum kalian menghubungkannya dengan database utama rumah sakit
* Clone project ini kemudian ketik `npm i` di cmd untuk menginstall semua dependency.
* Buat atau rename `.env-test` menjadi `.env` kemudian sesuaikan kebutuhan data yang ada didalam filenya.
* Ketik `npm run bpjs:dev` untuk menjalankan applikasi

# List URL

| Method | URL                         | Description |
| :----: |:---                         |:--                                                                 |
| GET    | `http://localhost:8888`     | Main Page / Base Url                                               |
| GET    | `_baseurl_/auth`            | Login untuk mendapatkan jwt token                                  |
| POST   | `_baseurl_/antrean`         | Create antrian kunjungan baru pasien                               |
| POST   | `_baseurl_/antrean/status`  | Untuk melihat status antrean kunjungan pasien                      |
| POST   | `_baseurl_/antrean/sisa`    | Untuk melihat sisa antrean pasien                                  |
| POST   | `_baseurl_/antrean/batal`   | Untuk membatalkan revesvasi kunjungan pasien selama belum check in |
| POST   | `_baseurl_/antrean/checkin` | Untuk melakukan check in                                           |
| POST   | `_baseurl_/operasi/rs`      | Untuk menampilkan list jadwal operasi di Rumah Sakit               |
| POST   | `_baseurl_/operasi/peserta` | Untuk menampilkan jadwal operasi pasien Mobile JKN                 |
| POST   | `_baseurl_/farmasi`         | Untuk mengambil antrian resep                                      |
| POST   | `_baseurl_/farmasi/status`  | Untuk melihat status antrian resep pasien saat ini                 |