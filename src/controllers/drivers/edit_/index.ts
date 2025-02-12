import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
import editDriverSchema from "./schema"
export default async function edit_driver(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const body = req.body
  const valid = await Utils.validateSchema(res, editDriverSchema, body)
  if (!valid) return
  const hashedPassword = Utils.getCryptoHash(body.password)
  const dbRes = await db.update("drivers", {
    id,
    password: hashedPassword,
    ...body,
  })
  console.log(dbRes)
  if (dbRes.error) {
    Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    driver: dbRes.data,
  })
}
