import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
import editMaintenanceSchema from "./schema"
export default async function edit_maintenance(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const valid = await Utils.validateSchema(res, editMaintenanceSchema, req.body)
  if (!valid) return
  const dbRes = await db.update("maintenances", {
    id,
    ...req.body,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    maintenance: dbRes.data,
  })
}
