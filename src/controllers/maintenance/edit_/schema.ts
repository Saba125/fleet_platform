import Joi from "joi"
const editMaintenanceSchema = Joi.object({
  vehicle_id: Joi.number().optional(),
  description: Joi.string().optional(),
  service_date: Joi.date().iso().optional(),
  cost: Joi.number().optional(),
  service_center: Joi.string().optional(),
  next_service_date: Joi.date().iso().optional(),
})
export default editMaintenanceSchema
