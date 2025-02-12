import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_maintenance_costs(
  req: Request,
  res: Response
) {
  const db: IDbTools = req.app.locals.db
  const total_cost = await db.select(
    `SELECT SUM(CAST(trip_cost AS NUMERIC)) AS total_cost FROM trips`
  )
  Utils.sendSuccess(res, {
    total_cost: total_cost.list,
  })
}
