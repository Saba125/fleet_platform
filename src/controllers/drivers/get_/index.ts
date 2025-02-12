import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_drivers(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const drivers = await db.select(
    `select * from drivers order by created_at asc`
  )
  Utils.sendSuccess(res, {
    drivers: drivers.list,
  })
}
