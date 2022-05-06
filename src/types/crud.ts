export type hasId<IdType = string> = { id: IdType }
export type OmittedId<T extends hasId> = Omit<T, "id">
export type Promisable<T> = T | Promise<T>

export type Creatable<T extends hasId, CreateBody = OmittedId<T>> = {
  create: (body: CreateBody) => Promisable<T | undefined>
}

export type Retrievable<T extends hasId> = {
  get: (id: T["id"]) => Promisable<T | undefined>
}

export type Updatable<T extends hasId, Query = Partial<T>> = {
  update: (id: T["id"], body: Query) => Promisable<T | undefined | boolean>
}

export type Deletable<T extends hasId> = {
  delete: (id: T["id"]) => Promisable<T | boolean>
}

export type Listable<T> = {
  getAll: () => Promisable<T[]>
}

export type Queryable<T, Query = Partial<T>> = {
  query: (query: Query) => Promisable<T[]>
}

export type QueryUpdatable<T, Query = Partial<T>, UpdateQuery = Partial<T>> = {
  updateByQuery: (query: Query, body: UpdateQuery) => Promisable<T[] | boolean>
}

export type QueryDeletable<T, Query = Partial<T>> = {
  deleteByQuery: (query: Query) => Promisable<T[] | boolean>
}
