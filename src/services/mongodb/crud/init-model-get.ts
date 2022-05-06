import { Model, isValidObjectId } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (id: T["id"]) => {
    if (!isValidObjectId(id))
      return undefined

    const doc = await model.findById(id)
    return doc ? parser(doc.toJSON()) : undefined
  }
