import Joi from "joi"
const addTripsSchema = Joi.object({
  vehicle_id: Joi.number().required(),
  driver_id: Joi.number().required(),
  route: Joi.string().required(),
  start_location: Joi.string().required(),
  end_location: Joi.string().required(),
  distance: Joi.number().required(),
  fuel_used: Joi.number().required(),
  trip_cost: Joi.number().required(),
  status: Joi.string().valid("planned", "ongoing", "completed"),
  start_time: Joi.date().iso().required(),
  end_time: Joi.date().iso().required(),
})
export default addTripsSchema
