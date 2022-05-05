import { Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"
import toJson from "./to-json"

export default <T extends hasId, Query = Partial<T>>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async (query: Query) => {
    const docs = await model.find(query)
    return docs.map(toJson).map(parser)
  }
