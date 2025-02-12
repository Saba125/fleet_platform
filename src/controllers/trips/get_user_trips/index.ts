import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_single_user_trip(
  req: Request,
  res: Response
) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const trip = await db.selectSingle(
    `select trips.*, drivers.name as driver_name, drivers.phone as driver_phone from trips join drivers on trips.driver_id = drivers.id where trips.id = $1 `,
    [id]
  )
  Utils.sendSuccess(res, {
    trip,
  })
}
