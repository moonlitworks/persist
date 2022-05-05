import { Mongoose } from "mongoose"
import { hasId, OmittedId } from "#types"
import { MongoModelOptions } from "../types"
import identity from "./identity"
import initModelCreate from "./init-model-create"
import initModelGet from "./init-model-get"
import initModelUpdate from "./init-model-update"
import initModelDelete from "./init-model-delete"
import initModelQuery from "./init-model-query"
import initModelGetAll from "./init-model-get-all"

export default <
  T extends hasId,
  CreateBody = Partial<OmittedId<T>>,
  UpdateBody = Partial<T>,
  Query = Partial<T>
>(db: Mongoose, options: MongoModelOptions<T>) => {
  const model = db.model<T>(
    options.collectionName,
    options.schema,
    options.collectionName,
  )
  const documentParser = options.documentParser ?? identity
  return {
    create: initModelCreate<T, CreateBody>(model, documentParser),
    get: initModelGet<T>(model, documentParser),
    update: initModelUpdate<T, UpdateBody>(model, documentParser),
    delete: initModelDelete<T>(model, documentParser),
    getAll: initModelGetAll<T>(model, documentParser),
    query: initModelQuery<T, Query>(model, documentParser),
  }
}