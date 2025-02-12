import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_trip_costs(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const trips = await db.select(`select * from trips`)
  const calculateTotalTripCosts = trips.list?.reduce(
    (acc, item) => acc + parseFloat(item.trip_cost),
    0
  )
  Utils.sendSuccess(res, {
    total_trip_cost: calculateTotalTripCosts,
    trips: trips.list,
  })
}
