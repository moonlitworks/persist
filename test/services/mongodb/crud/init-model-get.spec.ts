import sinon from "sinon"
import { expect } from "chai"
import mongoose from "mongoose"
import initModelGet from "../../../../src/services/mongodb/crud/init-model-get"

describe("initModelGet", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })
  
  it("should call model.findById with passed id", async () => {
    const model: any = {
      findById: sandbox.stub()
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns("test-item")
    const testId = "test-id"
    await initModelGet(model, parser as any)(testId)
    expect(model.findById.firstCall?.firstArg).to.eql(testId)
  })
  
  it("should not call model.findById when id is not valid ObjectId", async () => {
    const model: any = {
      findById: sandbox.stub()
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(false)
    const parser = sandbox.stub().returns("test-item")
    await initModelGet(model, parser as any)("test-id")
    expect(model.findById.calledOnce).to.be.false
  })
  
  it("should return undefined when id is not valid ObjectId", async () => {
    const model: any = {
      findById: sandbox.stub()
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(false)
    const parser = sandbox.stub().returns("test-item")
    const item = await initModelGet(model, parser as any)("test-id")
    expect(item).to.be.undefined
  })
  
  it("should return undefined when no item is found", async () => {
    const model: any = {
      findById: sandbox.stub().returns(null)
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub()
    const item = await initModelGet(model, parser as any)("test-id")
    expect(item).to.be.undefined
  })
  
  it("should call parser when item is found", async () => {
    const model: any = {
      findById: sandbox.stub().returns({ toJSON: () => {} })
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub()
    await initModelGet(model, parser as any)("test-id")
    expect(parser.calledOnce).to.be.true
  })
  
  it("should not call parser when no item is found", async () => {
    const model: any = {
      findById: sandbox.stub().returns(null)
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub()
    await initModelGet(model, parser as any)("test-id")
    expect(parser.calledOnce).to.be.false
  })
})
