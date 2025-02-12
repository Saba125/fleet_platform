import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
import addDriverSchema from "./schema"
export default async function add_driver(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const body = req.body
  const valid = await Utils.validateSchema(res, addDriverSchema, body)
  const hashedPassword = Utils.getCryptoHash(body.password)
  if (!valid) return
  const dbRes = await db.insert("drivers", {
    ...body,
    password: hashedPassword,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  
  Utils.sendSuccess(res, {
    driver: dbRes.data,
  })
}
