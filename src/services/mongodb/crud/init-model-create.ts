import { Model } from "mongoose"
import { hasId, OmittedId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId, CreateBody = OmittedId<T>>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (body: CreateBody) => {
    const doc = await model.create(body)
    return doc ? parser(doc.toJSON()) : undefined
  }
