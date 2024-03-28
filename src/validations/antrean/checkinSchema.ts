import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

const checkinAntreanSchema = Joi.object({
  kodebooking: Joi.string()
    .label('Kode Booking')
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.base": JoiMessage.string.base,
      "string.empty": JoiMessage.empty
    }),
  waktu: Joi.date()
    .label('Waktu')
    .timestamp()
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "date.base": JoiMessage.date.milliseconds,
      "date.empty": JoiMessage.empty
    }),
})

export default checkinAntreanSchema