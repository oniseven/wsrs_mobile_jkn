import moment from "moment";
moment.locale("id");
import { Request, Response } from "express";

import { ClientException } from "../../exceptions/ClientException";
import { NotFoundException } from "../../exceptions/NotFoundException";

import { getUnit } from "../../services/antrean/CreateService";
import { getDoctorScheduleAndQuota } from "../../services/antrean/StatusService";

import statusAntreanSchema from "../../validations/antrean/statusSchema";
import { IStatusAntreanInputRequest } from "../../types/antrean/IStatusAntreanInputRequest";
import { IStatusAntreanResponse } from "../../types/antrean/IStatusAntreanResponse";

const StatusAntrean = async (req: Request, res: Response) => {
  const body: IStatusAntreanInputRequest = req.body;

  // validasi input request user
  const { error, value: valid } = statusAntreanSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  const { kodepoli, tanggalperiksa, kodedokter, jampraktek } = body;

  // Cek apakan poli inputan tersedia
  const unitpoli = await getUnit(kodepoli);
  if (!unitpoli)
    throw new NotFoundException(
      "Poli yang anda pilih untuk saat ini belum tersedia di Rumah Sakit kami!"
    );

  // Cek jadwal dan quota dokter
  const doctor = await getDoctorScheduleAndQuota(
    unitpoli,
    kodedokter,
    tanggalperiksa,
    jampraktek
  );
  if (!doctor)
    throw new NotFoundException(
      `Jadwal dokter tidak tersedia di tanggal ${tanggalperiksa}, silahkan pilih di tanggal yang lain! `
    );

  const response: IStatusAntreanResponse = {
    namapoli: unitpoli.name,
    namadokter: doctor.schedule.doctor.name,
    totalantrean: doctor.totalantrean,
    sisaantrean: doctor.sisa_antrean,
    antreanpanggil: doctor.nomorantrianterlayani,
    sisakuotajkn: doctor.sisa_quota_bpjs,
    kuotajkn: doctor.schedule.quota_bpjs,
    sisakuotanonjkn: doctor.sisa_quota_nonbpjs,
    kuotanonjkn: doctor.schedule.quota_nonbpjs,
    keterangan: "",
  };

  return res.withData(response);
};

export default StatusAntrean;
