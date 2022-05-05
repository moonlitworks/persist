import sinon from "sinon"
import { expect } from "chai"
import mongoose from "mongoose"
import initModelDelete from "../../../../src/services/mongodb/crud/init-model-delete"

describe("initModelDelete", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })
  
  it("should call model.findByIdAndRemove with passed id", async () => {
    const model: any = {
      findByIdAndRemove: sandbox.stub().returns({ toJSON: () => {} })
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns({})
    const testId: any = "test-id"
    await initModelDelete(model, parser as any)(testId)
    expect(model.findByIdAndRemove.firstCall?.firstArg).to.eql(testId)
  })
  
  it("should not call model.findById when id is not valid ObjectId", async () => {
    const model: any = {
      findByIdAndRemove: sandbox.stub().returns({ toJSON: () => {} })
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(false)
    const parser = sandbox.stub().returns({})
    await initModelDelete(model, parser as any)("test-id")
    expect(model.findByIdAndRemove.calledOnce).to.be.false
  })
  
  it("should return undefined when id is not valid ObjectId", async () => {
    const model: any = {
      findByIdAndRemove: sandbox.stub().returns({ toJSON: () => {} })
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(false)
    const parser = sandbox.stub().returns("test-item")
    const item = await initModelDelete(model, parser as any)("test-id")
    expect(item).to.be.undefined
  })
  
  it("should return undefined when failed", async () => {
    const model: any = {
      findByIdAndRemove: sandbox.stub().returns(null)
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns("anything")
    const item = await initModelDelete(model, parser as any)("test-id")
    expect(item).to.be.undefined
  })
  
  it("should return deleted item when successful", async () => {
    const model: any = {
      findByIdAndRemove: sandbox.stub().returns({ toJSON: () => {} })
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns("test-item")
    const item = await initModelDelete(model, parser as any)("test-id")
    expect(item).to.eql("test-item")
  })
})
