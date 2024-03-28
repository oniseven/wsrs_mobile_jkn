import { Op } from "sequelize"
import { Doctor } from "../../models/Doctor"
import { DoctorSchedule } from "../../models/DoctorSchedule"
import { Unit } from "../../models/Unit"
import { Visit } from "../../models/Visit"

export interface IDoctorScheduleAndQuota {
  schedule: DoctorSchedule;
  sisa_quota_bpjs: number;
  sisa_quota_nonbpjs: number;
  totalantrean: number;
  terlayani: number;
  sisa_antrean: number;
  nomorantrianterlayani: string; // nomor antrian pasien yang terakhir yang dilayani
}

export const getDoctorScheduleAndQuota = async (unit: Unit,  kodedokter: string, visitdate: string, jampraktek: string): Promise<false|IDoctorScheduleAndQuota> => {
  const jampraktek_split = jampraktek.split('-')

  // cek apakan jadwal dokter terpilih ada
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

  // Hitung sisa quota bpjs
  const { count: count_bpjs } = await Visit.findAndCountAll({
    where: {
      date_visit: visitdate,
      unit_id: unit.id,
      insurance_id: 2 // berasumsi bahwa 2 adalah ID untuk penjamin bpjs kesehatan
    }
  })
  const sisa_quota_bpjs = schedule.quota_bpjs - count_bpjs

  // Hitung sisa quota non bpjs
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

  // ambil total antrean di dokter yang bersangkutan (bpjs + nonbpjs)
  const totalantrean: number = 10

  // ambil total antrean yang sudah dilayani (bpjs + nonbpjs)
  const terlayani: number = 5

  // hitung sisa antrean total
  const sisa_antrean: number = totalantrean - terlayani

  // ambil no antrian terakhir yang telah dilayani
  const nomorantrianterlayani = '5'

  return {
    schedule,
    sisa_quota_bpjs,
    sisa_quota_nonbpjs,
    totalantrean,
    terlayani,
    sisa_antrean,
    nomorantrianterlayani
  }
}