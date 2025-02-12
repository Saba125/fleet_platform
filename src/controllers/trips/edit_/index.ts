import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
import editTripsSchema from "./schema"
export default async function edit_trip(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const valid = await Utils.validateSchema(res, editTripsSchema, req.body)
  if (!valid) return
  const existingTrip = await db.selectSingle(
    `select * from trips where id = $1`,
    [id]
  )
  if (!existingTrip) {
    return Utils.sendError(res, {
      status: "error",
      message: `Trip with id ${id} is not found`,
    })
  }
  const dbRes = await db.update("trips", {
    id,
    ...req.body,
  })
  if (dbRes.error) {
    Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    trip: dbRes.data,
  })
}
