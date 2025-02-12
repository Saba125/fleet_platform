import Joi from "joi"
const addVehicleSchema = Joi.object({
  name: Joi.string().required(),
  model: Joi.string().required(),
  license_plate: Joi.string().required(),
  status: Joi.string().valid("available", "in use", "maintenance").required(),
  fuel_type: Joi.string().valid("Petrol", "Diesel", "Electric").required(),
  capacity: Joi.number().required(),
  image_url: Joi.string().optional(),
})
export default addVehicleSchema
