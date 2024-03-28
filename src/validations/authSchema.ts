import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../constans/joi.message";
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const authSchema = Joi.object({
  username: Joi.string()
    .label("Username")
    .min(3)
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.min": JoiMessage.min,
      "string.base": JoiMessage.string.base
    }),
  password: Joi.string()
    .label("Kata Sandi")
    .pattern(/^[a-zA-Z0-9@$!%*?_&]+$/)
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "string.pattern.base": JoiMessage.pattern.baseLogin,
    }),
});
