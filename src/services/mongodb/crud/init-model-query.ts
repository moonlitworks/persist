import { Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId, Query = Partial<T>>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (query: Query) => {
    const docs = await model.find(query)
    return docs.map(d => d.toJSON()).map(parser)
  }
