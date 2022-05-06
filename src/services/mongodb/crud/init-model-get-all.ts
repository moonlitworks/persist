import { Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"

export default <T extends hasId>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async () => {
    const docs = await model.find()
    return docs.map(d => d.toJSON()).map(parser)
  }
