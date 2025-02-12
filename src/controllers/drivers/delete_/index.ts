import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function delete_driver(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const vehicle = await db.delete("drivers", {
    id,
  })
  if (vehicle.error) {
    return Utils.sendError(res, vehicle.error.message)
  }
  Utils.sendSuccess(res, {
    status: "error",
    message: `Driver deleted`,
  })
}
