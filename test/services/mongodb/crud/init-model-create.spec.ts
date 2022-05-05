import sinon from "sinon"
import { expect } from "chai"
import initModelCreate from "../../../../src/services/mongodb/crud/init-model-create"

describe("initModelCreate", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })
  
  it("should call model.create with passed body", async () => {
    const model: any = {
      create: sandbox.stub().returns({ toJSON: () => {} })
    }
    const parser = sandbox.stub().returns({ id: "test-id", test: true })
    const testBody: any = { test: true }
    await initModelCreate(model, parser as any)(testBody)
    expect(model.create.firstCall?.firstArg).to.eql(testBody)
  })
  
  it("should return false if create returns nothing", async () => {
    const model: any = {
      create: sandbox.stub().returns(null)
    }
    const parser = sandbox.stub().returns({ id: "test-id", test: true })
    const testBody: any = { test: true }
    const created = await initModelCreate(model, parser as any)(testBody)
    expect(created).to.be.undefined
  })
  
  it("should call parser if create returns item", async () => {
    const model: any = {
      create: sandbox.stub().returns({ toJSON: () => {} })
    }
    const parser = sandbox.stub().returns({ id: "test-id", test: true })
    const testBody: any = { test: true }
    await initModelCreate(model, parser as any)(testBody)
    expect(parser.calledOnce).to.be.true
  })
})
