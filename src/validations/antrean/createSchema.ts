import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const createAntreanSchema = Joi.object({
  nomorkartu: Joi.string()
    .label("Nomor Kartu")
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  nik: Joi.string()
    .label("Nomor Induk Kependudukan (NIK)")
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  nohp: Joi.string()
    .label('Nomor HP')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  kodepoli: Joi.string()
    .label('Kode Poli')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  norm: Joi.string()
    .label('Nomor Rekam Medis (NoRM)')
    .allow(null, '')
    .messages({
      "string.base": JoiMessage.string.base
    }),
  kodedokter: Joi.number()
    .label('Kode Dokter')
    .integer()
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "number.base": JoiMessage.number.base,
      "number.empty": JoiMessage.empty,
    }),
  tanggalperiksa: Joi.date()
    .label('Tanggal Periksa')
    .format('YYYY-MM-DD')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "date:empty": JoiMessage.empty,
      "date:base": JoiMessage.date.base,
      "date:format": JoiMessage.date.format,
    }),
  jampraktek: Joi.string()
    .label('Jam Praktek')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  jeniskunjungan: Joi.number()
    .label('Jenis Kunjungan')
    .integer()
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "number.base": JoiMessage.number.base,
      "number.empty": JoiMessage.empty,
    }),
  nomorreferensi: Joi.string()
    .label("Nomor Referensi")
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    })
});

export default createAntreanSchema