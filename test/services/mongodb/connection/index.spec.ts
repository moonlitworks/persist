import sinon from "sinon"
import { expect } from "chai"
import mongoose from "mongoose"
import {
  get,
  close,
  connect,
  destroy,
  isConnected,
} from "../../../../src/services/mongodb/connection"

describe("connection", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
    destroy()
  })

  describe("destroy", () => {
    it("should return undefined", () => {
      const destroyed = destroy()
      expect(destroyed).to.be.undefined
    })
  })

  describe("connect", () => {
    it("should call mongoose connect with passed string", async () => {
      const mongooseConnect = sandbox.stub(mongoose, "connect")
      await connect("test-db-url")
      expect(mongooseConnect.firstCall?.firstArg).to.eql("test-db-url")
    })
  })

  describe("get", () => {
    it("should return undefined when db is destroyed or not initialized", () => {
      destroy()
      const db = get()
      expect(db).to.be.undefined
    })

    it("should return instance created by connect()", async () => {
      sandbox.stub(mongoose, "connect").resolves("test-db" as any)
      await connect("test-url")
      const db = get()
      expect(db).to.eql("test-db")
    })
  })

  describe("isConnected", () => {
    it("should return true if readyState is 1", async () => {
      const connectedInstance = {
        connection: {
          readyState: 1
        }
      }
      sandbox.stub(mongoose, "connect").resolves(connectedInstance as any)
      await connect("test-db-url")
      expect(isConnected()).to.be.true
    })
    
    it("should return true if readyState is not 1", async () => {
      const connectedInstance = {
        connection: {
          readyState: 0
        }
      }
      sandbox.stub(mongoose, "connect").resolves(connectedInstance as any)
      await connect("test-db-url")
      expect(isConnected()).to.be.false
    })
  })

  describe("close", () => {
    it("should return instance created by connect()", async () => {
      const testDb = {
        disconnect: () => {}
      }
      sandbox.stub(mongoose, "connect").resolves(testDb as any)
      const disconnectStub = sandbox.stub(testDb, "disconnect")
      await connect("test-db-url")
      await close()
      expect(disconnectStub.calledOnce).to.be.true
    })
  })
})
