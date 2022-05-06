import { isValidObjectId, Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (id: T["id"]) => {
    if (!isValidObjectId(id))
      return false

    const doc = await model.findByIdAndDelete(id)
    return !!doc
  }
