import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
export default async function delete_trip(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const dbRes = await db.delete(`trips`, {
    id,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    message: "Trip deleted",
  })
}
