import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_single(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const vehicle = await db.selectSingle(
    `select * from vehicles where id = $1`,
    [id]
  )
  if (!vehicle) {
    return Utils.sendError(res, {
      status: "error",
      message: `Vehicle with id ${id} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    vehicle,
  })
}
