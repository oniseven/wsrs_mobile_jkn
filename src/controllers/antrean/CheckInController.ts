import moment from "moment";
moment.locale("id");
import { Request, Response } from "express";

import { ClientException } from "../../exceptions/ClientException";
import { CreatedException } from "../../exceptions/CreatedException";

import { checkReservation, updateCheckIn } from "../../services/antrean/CheckInService";
import checkinAntreanSchema from "../../validations/antrean/checkinSchema";

import { ICheckInAntreanInputRequest } from "../../types/antrean/ICheckInAntreanInputRequest";

const CheckInAntrean = async (req: Request, res: Response) => {
  const body: ICheckInAntreanInputRequest = req.body;

  // validasi inputan user
  const { error } = checkinAntreanSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  // check apakah kodebooking ada dalam database atau tidak
  const [reservasi, message] = await checkReservation(body.kodebooking)

  if(!reservasi) throw new CreatedException(String(message))

  // update status check in dan waktu check in
  await updateCheckIn(reservasi, body.waktu)

  return res.noData(200, 'Anda berhasil check in!');
};

export default CheckInAntrean