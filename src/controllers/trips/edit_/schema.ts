import Joi from "joi"
const editTripsSchema = Joi.object({
  vehicle_id: Joi.number().optional(),
  driver_id: Joi.number().optional(),
  route: Joi.string().optional(),
  start_location: Joi.string().optional(),
  end_location: Joi.string().optional(),
  distance: Joi.number().optional(),
  fuel_used: Joi.number().optional(),
  trip_cost: Joi.number().optional(),
  status: Joi.string().valid("planned", "ongoing", "completed"),
  start_time: Joi.date().iso().optional(),
  end_time: Joi.date().iso().optional(),
})
export default editTripsSchema
