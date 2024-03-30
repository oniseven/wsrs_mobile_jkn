import moment from "moment";
import { Request, Response } from "express";

moment.locale("id");

import { ClientException } from "../../exceptions/ClientException";
import { CreatedException } from "../../exceptions/CreatedException";

import { kodebookingSchema } from "../../validations/kodebookingSchema";
import getStatusAntreanFarmasi from "../../services/farmasi/StatusAntreanService";

const StatusAntreanFarmasi = async (req: Request, res: Response): Promise<Express.Response> => {
  const body: {
    kodebooking: string
  } = req.body

  // validasi inputan user
  const { error } = kodebookingSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  // ambil status antrean resep
  const [result, message] = await getStatusAntreanFarmasi(body.kodebooking)
  if (!result) throw new CreatedException(String(message));

  return res.withData(result);
}

export default StatusAntreanFarmasi