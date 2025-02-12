import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import registerSchema from "./schema"
import Utils from "../../../utils"
import addVehicleSchema from "./schema"
export default async function add_vehicle(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const valid = await Utils.validateSchema(res, addVehicleSchema, req.body)
  if (!valid) return
  const image_url = req.file ? `/images/vehicles/${req.file.filename}` : null
  const dbRes = await db.insert("vehicles", {
    ...req.body,
    image_url,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    vehicle: dbRes.data,
  })
}
