import { isValidObjectId, Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId, Query = Partial<T>>(
  model: Model<T>,
  _parser: DocumentParser<T>
) =>
  async (id: T["id"], body: Query) => {
    if (!isValidObjectId(id)) return false

    const success = await model.findByIdAndUpdate(id, body)
    return !!success
  }
