import mongoose from "mongoose"

let _db: typeof mongoose | undefined

export const get = () => _db

export const close = () => get()?.disconnect()

export const isConnected = () => mongoose.ConnectionStates.connected === get()?.connection?.readyState

export const destroy = () => {
  _db = undefined
  return _db
}

export const connect = async (dbString: string) => {
  _db = await mongoose.connect(dbString)
  return _db
}
