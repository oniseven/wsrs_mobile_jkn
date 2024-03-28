import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const batalAntreanSchema = Joi.object({
  kodebooking: Joi.string()
    .label('Kode Booking')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  keterangan: Joi.string()
    .label('Keterangan')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
})

export default batalAntreanSchema