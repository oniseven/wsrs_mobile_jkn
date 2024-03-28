import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const operasiRsSchema = Joi.object({
  tanggalawal: Joi.date()
    .label('Tanggal Awal')
    .format('YYYY-MM-DD')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "date.base": JoiMessage.date.base,
      "date.format": JoiMessage.date.format,
      "date.empty": JoiMessage.empty
    }),
  tanggalakhir: Joi.date()
    .label('Tanggal Akhir')
    .format('YYYY-MM-DD')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "date.base": JoiMessage.date.base,
      "date.format": JoiMessage.date.format,
      "date.empty": JoiMessage.empty
    }),
})

export default operasiRsSchema