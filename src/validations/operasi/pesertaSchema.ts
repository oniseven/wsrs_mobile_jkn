import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const operasiPesertaSchema = Joi.object({
  nopeserta: Joi.string()
    .label('Tanggal Awal')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    })
})

export default operasiPesertaSchema