import moment from "moment";
moment.locale("id");
import { Request, Response } from "express";

import { ClientException } from "../../exceptions/ClientException";
import { CreatedException } from "../../exceptions/CreatedException";
import { NotFoundException } from "../../exceptions/NotFoundException";

import { kodebookingSchema } from "../../validations/kodebookingSchema";
import { getAntrean, getKunjungan, getReservation } from "../../services/antrean/SisaService";

import { ISisaAntreanResponse } from "../../types/antrean/ISisaAntreanResponse";

const SisaAntrean = async (req: Request, res: Response) => {
  const body: { kodebooking: string } = req.body;

  // validasi inputan user
  const { error } = kodebookingSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  const { kodebooking } = body;

  // ambil data reservasi berdasarkan kodebooking
  const reservation = await getReservation(kodebooking);
  if (!reservation)
    throw new NotFoundException(
      `Reservasi dengan nomor ${kodebooking} tidak ditemukan!`
    );

  // check apakah reservasi dibatalkan atau tidak
  if (reservation.is_cancel) throw new CreatedException(`Reservasi nomor ${kodebooking} telah dibatalkan!`)

  // Ambil nomor antrian kunjungan berdasarkan kodebooking
  const kunjungan = getKunjungan(reservation, kodebooking);
  if (!kunjungan)
    throw new NotFoundException(`Kunjungan pasien tidak ditemukan!`);

  // Ambil total sisa antrean yg belum dilayani, dan no antrean terakhir yang telah dilayani
  const antrean = await getAntrean(reservation, kodebooking);
  if (!antrean) throw new NotFoundException('Antrean Tidak Ditemukan!')

  // hitung waktu tunggu pasien
  // jika diamsumsikan untuk melayani 1 pasien membutuhkan waktu 1 jam maksimal,
  // maka dapat menggunakan waktu 1 jam sebagai default waktu tunggu yang dikalikan dengan banyaknya sisa antrean yang ada.
  const spm: number = 60; // 1 jam (60 menit)
  const waktutunggu: number = spm * 60 * (antrean.sisa_antrean - 1);

  const response: ISisaAntreanResponse = {
    nomorantrean: "10",
    namapoli: "Poli Spesialis Penyakit Dalam",
    namadokter: "dr. John Doe",
    sisaantrean: antrean.sisa_antrean,
    antreanpanggil: antrean.no_antrean,
    waktutunggu,
    keterangan: "",
  };

  return res.withData(response);
};

export default SisaAntrean;
