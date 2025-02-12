import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_trips(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const trips = await db.select(
    `SELECT trips.*, drivers.name as driver_name, drivers.phone as drivers_phone
   FROM trips 
   JOIN drivers ON trips.driver_id = drivers.id`
  )
  Utils.sendSuccess(res, {
    trips: trips.list,
  })
}
