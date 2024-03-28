import moment from "moment";
moment.locale("id");
import { Request, Response } from "express";

import { ClientException } from "../../exceptions/ClientException";

import { ICreateAntrean } from "../../types/antrean/ICreateAntrean";
import {
  getDoctor,
  getPatient,
  getUnit,
  isInWard,
  isRegistered,
  isValidVisitDate,
  registration,
} from "../../services/antrean/CreateService";
import createAntreanSchema from "../../validations/antrean/createSchema";
import { CreatedException } from "../../exceptions/CreatedException";

const CreateAntrean = async (
  req: Request,
  res: Response
): Promise<Express.Response> => {
  const body = req.body as ICreateAntrean;

  // 1. Cek apakah input data sudah sesuai dengan format yang di tetapkan
  const { error, value: valid } = createAntreanSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  const {
    norm,
    nik,
    nomorkartu,
    kodepoli,
    tanggalperiksa,
    kodedokter,
    jampraktek,
  } = body;

  // 2. Cek apakah NIK/NORM pasien terdaftar atau tidak
  const pasien = await getPatient(norm, nik, nomorkartu);
  if (!pasien)
    throw new CreatedException(
      `Anda belum terdaftar sebagai pasien. Silahkan melakukan pendaftaran pasien baru dengan datang langsung ke Rumah Sakit!`
    );

  // 3. Cek apakah poli yang dituju tersedia berdasarkan inputan kodepoli
  const unitpoli = await getUnit(kodepoli);
  if (!unitpoli)
    throw new CreatedException(
      "Poli yang anda pilih untuk saat ini belum tersedia di Rumah Sakit kami!"
    );

  /**
   * 4. Cek  apakan tanggal reserveasi / tanggal periksa valid atau tidak
   * Disini bisa ditambakan pengecekan seperti misal:
   *  - pendaftaran poli hanya bisa dilakukan pada hari H
   *  - pendaftaran poli hanya bisa dilakukan harus H-1
   *  - pendaftaran poli hanya bisa dilakukan minimal H-1 dan maksimal H-20
   *  - cek apakah tanggal pendaftaran/periksa merupakan hari Libur
   *  - dsb
   **/
  const validVisitDate = await isValidVisitDate(tanggalperiksa);
  if (!validVisitDate)
    throw new CreatedException(
      `Tidak dapat melakukan pendaftaran pada tanggal yang dipilih (${tanggalperiksa}), silahkan memilih tanggal yang lain!`
    );

  // 5. Cek apakah pasien sudah terdaftar secara online di tanggal yang sama, baik itu melalui PM Online atau MJKN Online
  const registered = await isRegistered(pasien, tanggalperiksa, kodepoli);
  if (registered.length)
    throw new CreatedException(
      `Anda telah melakukan pendaftaran untuk kunjungan pada ${unitpoli.name} tanggal ${tanggalperiksa}!`
    );

  // 6. Cek apakah status pasien masih rawat inap
  const inward = await isInWard(pasien);
  if (inward)
    throw new CreatedException(
      `Pendaftaran kunjungan tidak dapat dilakukan, dikarenakan anda masih tercatat sebagai pasien Rawat Inap`
    );

  // 7. Cek apakah dokter serta jadwal dokter sesuai dan quota dokter masih tersedia
  const doctor = await getDoctor(
    unitpoli,
    kodedokter,
    tanggalperiksa,
    jampraktek
  );
  if (!doctor)
    throw new CreatedException(
      `Tidak dapat melakukan pendaftaran di tanggal yang dipilih dikarenakan Jadwal Dokter tidak ada atau quota dokter telah penuh`
    );

  // 8. Setelah lolos pengecekan diatas maka lakukan pembuatan data baru
  const response = await registration(body, pasien, unitpoli, doctor);

  if (!response.status) throw new CreatedException(String(response.data))

  return res.withData(response.data);
};

export default CreateAntrean;
