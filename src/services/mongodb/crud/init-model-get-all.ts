import { Model } from "mongoose"
import { hasId } from "../../../types"
import { DocumentParser } from "../types"
import toJson from "./to-json"

export default <T extends hasId>(
  model: Model<T>,
  parser: DocumentParser<T>
) =>
  async () => {
    const docs = await model.find()
    return docs.map(toJson).map(parser)
  }
