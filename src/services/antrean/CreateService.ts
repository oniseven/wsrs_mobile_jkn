import moment, { Moment } from "moment"
moment.locale('id')
import { v4 } from "uuid"
import { Op } from "sequelize"

import { Unit } from "../../models/Unit"
import { Visit } from "../../models/Visit"
import { Doctor } from "../../models/Doctor"
import { Patient } from "../../models/Patient"
import { Setting } from "../../models/Setting"
import { Holiday } from "../../models/Holiday"
import { DoctorSchedule } from "../../models/DoctorSchedule"
import { OnlineRegistration } from "../../models/OnlineRegistration"

import { ICreateAntrean } from "../../types/antrean/ICreateAntrean"
import { ICreateAntreanResponseData } from "../../types/antrean/ICreateAntreanResponseData"

export const getPatient = async (
  norm: string | null,
  nik: string,
  nomorkartu: string
): Promise<Patient|null> => {
  const pasien = await Patient.findOne({
    attributes: [
      "id",
      "name",
      "norm",
      "nik",
      ["insurance_number", "nomorkartu"],
    ],
    where: {
      [Op.or]: [{ norm }, { nik }, { insurance_number: nomorkartu }],
    },
  })

  return pasien
}

export const getUnit = async (unit_code: string): Promise<Unit|null> => {
  const unit = await Unit.findOne({
    where: {
      bpjs_code: unit_code,
      is_jkn: 1,
      is_active: 1
    }
  })

  return unit
}

export const isValidVisitDate = async (tanggalperiksa: string): Promise<false | Moment> => {
  const dateVisit = moment(tanggalperiksa)

  // Cek apakah tanggal periksa merupakan hari minggu
  if(Number(dateVisit.format('E')) === 7) return false

  // Cek apakah tanggal periksa merupakan hari libur
  const holiday = await Holiday.findOne({
    where: { date: tanggalperiksa }
  })
  if(holiday) return false

  // Cek apakan tanggal periksa berada direntang hari antara min max yang tertera di table setting
  // default H-0 and H-30
  // get mjkn date config
  const setting = await Setting.findOne({
    where: { id: 1 }
  })
  const { min, max } = JSON.parse(setting?.data || '{min: 0, max: 30}') as {min: number, max: number}
  const dateDiff = dateVisit.startOf('day').diff(moment().startOf('day'), 'days')
  
  return (dateDiff >= min && dateDiff <= max) ? dateVisit : false
}

export const isRegistered = async (patient: Patient, datevisit: string, kodepoli: string): Promise<OnlineRegistration[]> => {
  const registered = await OnlineRegistration.findAll({
    where: {
      norm: patient.norm,
      kodepoli,
      datevisit
    }
  })

  return registered
}

export const isInWard = async (patient: Patient): Promise<Visit|null> => {
  const inWard = await Visit.findOne({
    where: {
      patient_id: patient.id,
      visit_type: 3,
      return_date: {
        [Op.not]: null
      }
    }
  })

  return inWard
}

export interface IScheduleAndQuotaDoctor {
  schedule: DoctorSchedule,
  sisa_quota_bpjs: number,
  sisa_quota_nonbpjs: number,
  start_time: string;
  end_time: string;
}

export const getDoctor = async (unit: Unit,  kodedokter: string, visitdate: string, jampraktek: string): Promise<false|IScheduleAndQuotaDoctor> => {
  const jampraktek_split = jampraktek.split('-')
  const schedule = await DoctorSchedule.findOne({
    include: [
      {
        required: true,
        model: Doctor,
        attributes: ['id', 'name', 'kodebpjs'],
        where: {
          kodebpjs: kodedokter
        }
      }
    ],
    where: {
      is_active: 1,
      datesc: visitdate,
      start_time: jampraktek_split[0],
      end_time: jampraktek_split[1],
      unit_id: unit.id
    }
  })
  if(!schedule) return false

  // Cek sisa quota dokter
  const { count } = await Visit.findAndCountAll({
    where: {
      date_visit: visitdate,
      unit_id: unit.id,
      insurance_id: 2 // berasumsi bahwa 2 adalah ID untuk penjamin bpjs kesehatan
    }
  })
  const sisa_quota_bpjs = schedule.quota_bpjs - count
  if(!sisa_quota_bpjs) return false

  // Ambil quota non bpjs
  const { count: count_nonbpjs } = await Visit.findAndCountAll({
    where: {
      date_visit: visitdate,
      unit_id: unit.id,
      insurance_id: {
        [Op.ne]: 2
      }
    }
  })
  const sisa_quota_nonbpjs = schedule.quota_nonbpjs - count_nonbpjs

  return {
    schedule,
    sisa_quota_bpjs,
    sisa_quota_nonbpjs,
    start_time: jampraktek_split[0],
    end_time: jampraktek_split[1]
  }
}

interface IRegistrationAntrean {
  status: boolean;
  data: ICreateAntreanResponseData | string
}

export const registration = async (data: ICreateAntrean, pasien: Patient, unit: Unit, doctor: IScheduleAndQuotaDoctor): Promise<IRegistrationAntrean> => {
  /**
   * Terdapat beberapa langkah dalam menyimpan data reservasi JKN,
   * 1. Simpan detail data yang dikirim oleh bpjs ke table reservasi sesuai dengan database anda
   * 2. Create kunjungan pasien untuk mendapatkan nomor antrian
   */
  const transaction = await OnlineRegistration.sequelize?.transaction();
  
  try {
    const bookingcode = v4();
    const register = await OnlineRegistration.create({
      bookingcode,
      datevisit: data.tanggalperiksa,
      norm: data.norm,
      kodeanggota: data.nomorkartu,
      noreferensi: data.nomorreferensi,
      nik: data.nik,
      nohp: data.nohp,
      kodepoli: data.kodepoli,
      kodedokter: data.kodedokter,
      jampraktek_awal: doctor.start_time,
      jampraktek_akhir: doctor.end_time,
      jeniskunjungan: data.jeniskunjungan,
      online_type: 2
    }, { transaction })

    const visit = await Visit.create({
      patient_id: pasien.id,
      unit_id: unit.id,
      insurance_id: 2, // assuming that 2 is bpjs kesehatan
      doctor_id: doctor.schedule.doctor_id,
      visit_type: 1,
      date_visit: data.tanggalperiksa,
      online_registration_id: register.id
    }, { transaction })

    const tgl_estimasi = `${data.tanggalperiksa} ${doctor.schedule.start_time}:00`;
    const bookingdata = {
      nomorantrean: '1',
      angkaantrean: 1,
      kodebooking: bookingcode,
      norm: String(pasien.norm),
      namapoli: unit.name,
      estimasidilayani: moment(tgl_estimasi).valueOf(),
      sisakuotajkn: doctor.sisa_quota_bpjs,
      kuotajkn: doctor.schedule.quota_bpjs,
      sisakuotanonjkn: doctor.sisa_quota_nonbpjs,
      kuotanonjkn: doctor.schedule.quota_nonbpjs,
      keterangan: 'Peserta harap datang 60 menit lebih awal guna pencatatan administrasi'
    }

    await transaction?.commit();

    return {
      status: true,
      data: bookingdata
    }
  } catch (error) {
    await transaction?.rollback();
    console.log(error)
    return {
      status: false,
      data: "Pendaftaran gagal, silahkan coba beberapa saat lagi!"
    }
  }
}