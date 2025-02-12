import Joi from "joi"
const addDriverSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^(\+?995)?(79\d{7}|5\d{8})$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid Georgian number (+9955XXXXXXXX or 599XXXXXX).",
      "string.empty": "Phone number is required.",
    }),
  assigned_vehicle_id: Joi.number().required(),
  license_number: Joi.number().required(),
  role: Joi.string().valid("driver", "fleet_manager", "admin").required(),
})
export default addDriverSchema
