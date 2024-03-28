import moment from "moment";
import { JenisResep } from "./AmbilAntreanService";
moment.locale("id");

interface IAmbilAntreanData {
  jenisresep: JenisResep;
  totalantrean: number;
  sisaantrean: number;
  antreanpanggil: string;
  keterangan: "";
}

const getStatusAntreanFarmasi = async (
  kodebooking: string
): Promise<[IAmbilAntreanData | false, string | null]> => {
  /**
   * Must do
   * 1. cek apakah terdapat kunjungan dengan kodebooking yg ditentukan
   * 2. cek apakan kunjungan tersebut memiliki antrian resep obat
   * 3. jika ada resep, maka ambil total antrean untuk jenis resep tersebut
   * 4. ambil total nomor antrian resep sesuai jenis resep yg ada yg telah terpanggil atau selesai
   * 5. ambil max nomor antrian terakhir yang telah diambil obatnya
   */

  // cek kunjungan
  const kunjungan = true; // ambil data kunjungan dengan kodebooking yg telah disediakan
  if (!kunjungan)
    return [
      false,
      `Kunjungan dengan kode booking ${kodebooking} tidak ditemukan`,
    ];

  // cek resep obat
  const resep = true;
  if (!resep)
    return [
      false,
      `Kunjungan pasien dengan kode booking ${kodebooking} tidak memiliki resep`,
    ];

  // ambil total antrian
  const totalAntrean = 10;

  // ambil total antrian yg telah terlayani atau terpanggil
  const totalTerpanggil = 8;

  // hitung sisa antrean
  const sisaAntrean = totalAntrean - totalTerpanggil;

  // ambil max nomor antrian terakhir yang telah terpanggil
  const noAntreanTerpanggilSaatIni = "R 8";

  return [
    {
      jenisresep: "Racikan", // Racikan / Non Racikan
      totalantrean: totalAntrean,
      sisaantrean: sisaAntrean,
      antreanpanggil: noAntreanTerpanggilSaatIni,
      keterangan: "",
    },
    null,
  ];
};

export default getStatusAntreanFarmasi;
