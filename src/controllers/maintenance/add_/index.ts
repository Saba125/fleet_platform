import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
import addMaintenanceSchema from "./schema"
export default async function add_maintenance(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const valid = await Utils.validateSchema(res, addMaintenanceSchema, req.body)
  if (!valid) return
  const dbRes = await db.insert("maintenances", {
    ...req.body,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    maintenance: dbRes.data,
  })
}
