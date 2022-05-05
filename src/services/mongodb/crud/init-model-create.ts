import { Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"
import toJson from "./to-json"

export default <T extends hasId, CreateBody = Partial<T>>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (body: CreateBody) => {
    const doc = await model.create(body)
    return doc ? parser(toJson(doc)) : false
  }
