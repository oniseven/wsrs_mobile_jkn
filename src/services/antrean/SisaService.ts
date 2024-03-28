import { OnlineRegistration } from "../../models/OnlineRegistration"
import { Visit } from "../../models/Visit"

export const getReservation = async (kodebooking: string): Promise<OnlineRegistration|null> => {
  const reservation = await OnlineRegistration.findOne({
    where: {
      bookingcode: kodebooking
    }
  })
  
  return reservation
}

export const getKunjungan = async (reservasi: OnlineRegistration, kodebooking: string): Promise<Visit|null> => {
  const visit = await Visit.findOne({
    where: {
      online_registration_id: reservasi.id
    }
  })

  return visit
}

export const getAntrean = async (reservasi: OnlineRegistration, kodebooking: string) => {
  // ambil no antrean terakhir yang terpanggil
  const no_antrean: string = '5'

  // ambil total sisa antrean yang belum terpanggil
  const sisa_antrean: number = 5

  return {
    no_antrean,
    sisa_antrean
  }
}