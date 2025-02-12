import Joi from "joi"
const addMaintenanceSchema = Joi.object({
  vehicle_id: Joi.number().required(),
  description: Joi.string().required(),
  service_date: Joi.date().iso().required(),
  cost: Joi.number().required(),
  service_center: Joi.string().required(),
  next_service_date: Joi.date().iso().required(),
})
export default addMaintenanceSchema
