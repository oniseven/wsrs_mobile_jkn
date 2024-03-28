import moment from "moment";
moment.locale("id");
import { Request, Response } from "express";

import { ClientException } from "../../exceptions/ClientException";
import { OnlineRegistration } from "../../models/OnlineRegistration";
import { IBatalAntreanInputRequest } from "../../types/antrean/IBatalAntreanInputRequest";
import { batalReservasi, getReservasi } from "../../services/antrean/BatalService";
import batalAntreanSchema from "../../validations/antrean/batalSchema";
import { CreatedException } from "../../exceptions/CreatedException";

const BatalAntrean = async (req: Request, res: Response) => {
  const body: IBatalAntreanInputRequest = req.body;

  // validasi inputan user
  const { error } = batalAntreanSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  const { kodebooking, keterangan } = body;

  // ambil dan cek detail reservasi pasien, apakah kodebooking yang diberikan merupak kodebooking yang valid
  const [reservasi, message] = await getReservasi(kodebooking);
  if (!reservasi) throw new CreatedException(message as string)

  // update status batal reservasi
  await batalReservasi(reservasi, keterangan);

  return res.noData();
};

export default BatalAntrean