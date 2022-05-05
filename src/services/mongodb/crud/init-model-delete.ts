import { isValidObjectId, Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId>(
  model: Model<T>,
  _parser: DocumentParser<T>
) =>
  async (id: T["id"]) => {
    if (!isValidObjectId(id)) return false

    const success = await model.findByIdAndRemove(id)
    return !!success
  }
