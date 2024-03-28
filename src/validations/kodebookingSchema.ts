import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const kodebookingSchema = Joi.object({
  kodebooking: Joi.string()
    .label("Kode Booking")
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.min": JoiMessage.min,
      "string.base": JoiMessage.string.base
    })
});
