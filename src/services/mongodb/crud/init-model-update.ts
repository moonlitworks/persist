import { isValidObjectId, Model } from "mongoose"
import { hasId } from "#types"
import { DocumentParser } from "../types"

export default <T extends hasId, Query = Partial<T>>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (id: T["id"], body: Query) => {
    if (!isValidObjectId(id))
      return undefined

    const doc = await model.findByIdAndUpdate(id, body, { new: true })
    return doc ? parser(doc.toJSON()) : undefined
  }
