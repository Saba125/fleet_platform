import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_vehicles(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const vehicles = await db.select(`select * from vehicles order by model asc`)
  return Utils.sendSuccess(res, {
    vehicles: vehicles.list,
  })
}
