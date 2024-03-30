import { Request, Response } from "express";
import { ClientException } from "../../exceptions/ClientException";

import operasiRsSchema from "../../validations/operasi/rumahsakitSchema";
import getListOperasi from "../../services/operasi/RumahSakitService";

interface IOperasiRSRequest {
  tanggalawal: string;
  tanggalakhir: string;
}

const OperasiRumahSakit = async (req: Request, res: Response): Promise<Express.Response> => {
  const body: IOperasiRSRequest = req.body;

  // validasi inputan user
  const { error } = operasiRsSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  // ambil list data operasi pasien
  const list = await getListOperasi(body.tanggalawal, body.tanggalakhir)

  return res.withData({list})
};

export default OperasiRumahSakit;
