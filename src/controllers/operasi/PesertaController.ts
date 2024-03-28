import { Request, Response } from "express";
import { ClientException } from "../../exceptions/ClientException";

import operasiPesertaSchema from "../../validations/operasi/pesertaSchema";
import getOperasiPeserta from "../../services/operasi/PesertaService";

const OperasiPeserta = async (req: Request, res: Response) => {
  const body: {
    nopeserta: string
  } = req.body;

  // validasi inputan user
  const { error } = operasiPesertaSchema.validate(body);
  if (error) throw new ClientException(error.details[0].message);

  // ambil data operasi peserta
  // return [] apabila tidak ada data
  const list = await getOperasiPeserta(body.nopeserta)

  return res.withData({list})
}

export default OperasiPeserta