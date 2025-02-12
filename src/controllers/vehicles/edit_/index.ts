import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
import editVehicleSchema from "./schema"
export default async function edit_vehicle(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const valid = await Utils.validateSchema(res, editVehicleSchema, req.body)
  if (!valid) return
  const existingVehicle = (await db.selectSingle(
    `select * from vehicles where id = $1`,
    [id]
  )) as IVehicle
  if (!existingVehicle) {
    return Utils.sendError(res, {
      status: "error",
      message: `Vehicle with id ${id} is not found`,
    })
  }
  const image_url = req.file
    ? `/images/vehicles/${req.file.filename}`
    : existingVehicle.image_url

  console.log(image_url)
  const dbRes = await db.update("vehicles", {
    id,
    image_url,
    ...req.body,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    vehicle: dbRes.data,
  })
}
