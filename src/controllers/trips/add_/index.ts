import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
import addTripsSchema from "./schema"
export default async function add_trip(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const body = req.body
  const valid = Utils.validateSchema(res, addTripsSchema, body)
  if (!valid) return
  const dbRes = await db.insert("trips", {
    ...body,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    trip: dbRes.data,
  })
}
