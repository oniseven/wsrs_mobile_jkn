import moment from "moment";
moment.locale("id");

export type JenisResep = "Racikan" | "Non Racikan";

interface IAmbilAntreanData {
  jenisresep: JenisResep;
  nomorantrean: string;
  keterangan: "";
}

const getFarmasi = async (
  kodebooking: string
): Promise<[IAmbilAntreanData | false, string | null]> => {
  /**
   * Must do
   * 1. cek apakah terdapat kunjungan dengan kodebooking yg ditentukan
   * 2. cek apakan kunjungan tersebut memiliki antrian resep obat, apabila ada ambil nomor antriannya
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

  return [
    {
      jenisresep: "Racikan",
      nomorantrean: "R 8",
      keterangan: "",
    },
    null,
  ];
};

export default getFarmasi;
