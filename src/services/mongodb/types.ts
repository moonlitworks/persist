import { Schema } from "mongoose"
import {
  hasId,
  OmittedId,
  Creatable,
  Retrievable,
  Updatable,
  Deletable,
  Listable,
  Queryable,
} from "../../types"

export type DocumentParser<T = any> = (doc: any) => T

export type MongoModelOptions<T = any> = {
  schema: Schema,
  collectionName: string
  documentParser?: DocumentParser<T>
}

export type MongoCrud<
  T extends hasId,
  CreateBody = OmittedId<T>,
  UpdateBody = Partial<T>,
  Query = Partial<T>
> =
  & Creatable<T, CreateBody>
  & Retrievable<T>
  & Updatable<T, UpdateBody>
  & Deletable<T>
  & Listable<T>
  & Queryable<T, Query>
