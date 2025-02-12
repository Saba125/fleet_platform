import { Request, Response } from "express"
import { IDbTools, IVehicle } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_single_driver(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const driver = await db.selectSingle(`select * from drivers where id = $1`, [
    id,
  ])
  if (!driver) {
    return Utils.sendError(res, {
      status: "error",
      message: `driver with id ${id} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    driver,
  })
}
