import sinon from "sinon"
import { expect } from "chai"
import mongoose from "mongoose"
import initModelUpdate from "../../../../src/services/mongodb/crud/init-model-update"

describe("initModelUpdate", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })
  
  it("should call model.findByIdAndUpdate with passed id", async () => {
    const model: any = {
      findByIdAndUpdate: sandbox.stub().returns("anything")
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns({})
    const testId: any = "test-id"
    const testBody: any = { test: true }
    await initModelUpdate(model, parser as any)(testId, testBody)
    expect(model.findByIdAndUpdate.firstCall?.firstArg).to.eql(testId)
  })
  
  it("should call model.findByIdAndUpdate with passed body", async () => {
    const model: any = {
      findByIdAndUpdate: sandbox.stub().returns("anything")
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns({})
    const testId: any = "test-id"
    const testBody: any = { test: true }
    await initModelUpdate(model, parser as any)(testId, testBody)
    expect(model.findByIdAndUpdate.firstCall?.lastArg).to.eql(testBody)
  })
  
  it("should not call model.findByIdAndUpdate when id is not valid ObjectId", async () => {
    const model: any = {
      findByIdAndUpdate: sandbox.stub().returns("anything")
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(false)
    const parser = sandbox.stub().returns({})
    const testId: any = "test-id"
    const testBody: any = { test: true }
    await initModelUpdate(model, parser as any)(testId, testBody)
    expect(model.findByIdAndUpdate.calledOnce).to.be.false
  })
  
  it("should call model.findByIdAndUpdate when id is valid ObjectId", async () => {
    const model: any = {
      findByIdAndUpdate: sandbox.stub().returns("anything")
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns({})
    const testId: any = "test-id"
    const testBody: any = { test: true }
    await initModelUpdate(model, parser as any)(testId, testBody)
    expect(model.findByIdAndUpdate.calledOnce).to.be.true
  })
  
  it("should return true when findByIdAndUpdate returns anything", async () => {
    const model: any = {
      findByIdAndUpdate: sandbox.stub().returns("anything")
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns("test-item")
    const testId: any = "test-id"
    const testBody: any = { test: true }
    const item = await initModelUpdate(model, parser as any)(testId, testBody)
    expect(item).to.be.true
  })
  
  it("should return true when findByIdAndUpdate returns null", async () => {
    const model: any = {
      findByIdAndUpdate: sandbox.stub().returns(null)
    }
    sandbox.stub(mongoose, "isValidObjectId").returns(true)
    const parser = sandbox.stub().returns("test-item")
    const testId: any = "test-id"
    const testBody: any = { test: true }
    const item = await initModelUpdate(model, parser as any)(testId, testBody)
    expect(item).to.be.false
  })
})
