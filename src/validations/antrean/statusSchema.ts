import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const statusAntreanSchema = Joi.object({
  kodepoli: Joi.string()
    .label('Kode Poli')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
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
})

export default statusAntreanSchema