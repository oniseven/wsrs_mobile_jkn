import moment from "moment"
moment.locale('id')

import { OnlineRegistration } from "../../models/OnlineRegistration"

export const checkReservation = async (kodebooking: string): Promise<[OnlineRegistration|false, string|null]> => {
  const reservation = await OnlineRegistration.findOne({
    where: {
      bookingcode: kodebooking
    }
  })

  if(!reservation) return [false, 'Kode Booking Tidak Ditemukan, Anda Belum Melakukan Pendaftaran melalui Mobile JKN']

  if(reservation.is_cancel) {
    const cancelDate = moment(reservation.is_cancel_at)
    return [false, `Reservasi telah dibatalkan sebelumnya dengan alasan '${reservation.is_cancel_desc}' pada tanggal ${cancelDate.format('DD-MM-YYYY HH:mm:ss')}`]
  }
  
  if(reservation.checkin) {
    const checkInDate = moment(reservation.checkin_at)
    return [false, `Anda telah melakukan check in pada tanggal ${checkInDate.format('DD-MM-YYYY HH:mm:ss')}`]
  }

  return [reservation, null]
}

export const updateCheckIn = async (reservation: OnlineRegistration, waktu: number): Promise<void> => {
  try {
    await OnlineRegistration.update({
      checkin: 1,
      checkin_at: new Date(waktu)
    }, {
      where: {
        id: reservation.id
      }
    })
  } catch (error) {
    throw error
  }
}