import moment from "moment";
import { Request, Response } from "express";

moment.locale("id");

import { ClientException } from "../../exceptions/ClientException";
import { CreatedException } from "../../exceptions/CreatedException";

import getFarmasi from "../../services/farmasi/AmbilAntreanService";
import { kodebookingSchema } from "../../validations/kodebookingSchema";

const AmbilAntreanFarmasi = async (req: Request, res: Response) => {
  const body: {
    kodebooking: string;
  } = req.body;

  // validasi inputan user
  const { error } = kodebookingSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  // get nomor antrian farmasi / resep
  const [result, message] = await getFarmasi(body.kodebooking);
  if (!result) throw new CreatedException(String(message));

  return res.withData(result);
};

export default AmbilAntreanFarmasi;
