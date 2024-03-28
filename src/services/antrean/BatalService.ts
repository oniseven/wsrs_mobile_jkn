import moment from "moment"
moment.locale('id')

import { Sequelize } from "sequelize"
import { OnlineRegistration } from "../../models/OnlineRegistration"

export const getReservasi = async (kodebooking: string): Promise<[false|OnlineRegistration, string|null]> => {
  const reservasi = await OnlineRegistration.findOne({
    where:{
      bookingcode: kodebooking
    }
  })
  if(!reservasi) return [false, 'Reservasi pasien tidak ditemukan']

  if(reservasi.is_cancel) {
    const cancelDate = moment(reservasi.is_cancel_at)
    return [false, `Reservasi tidak dapat dibatalkan karena pasien telah membatalkan reservasi pada tanggal ${cancelDate.format('DD-MM-YYYY HH:mm:ss')} dengan alasan ${reservasi.is_cancel_desc}`]
  }

  if(reservasi.checkin) {
    const checkInDate = moment(reservasi.checkin_at)
    return [false, `Reservasi tidak dapat dibatalkan karena pasien telah check in pada tanggal ${checkInDate.format('DD-MM-YYYY HH:mm:ss')}` ]
  }

  return [reservasi, null]
}

export const batalReservasi = async (reservasi: OnlineRegistration, keterangan: string): Promise<void> => {
  await OnlineRegistration.update({
    is_cancel: 1,
    is_cancel_at: Sequelize.literal('CURRENT_TIMESTAMP()'),
    is_cancel_decs: keterangan
  }, {
    where: {
      id: reservasi.id
    }
  })
}