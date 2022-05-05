import sinon from "sinon"
import { expect } from "chai"
import initModelGetAll from "../../../../src/services/mongodb/crud/init-model-get-all"

describe("initModelGetAll", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })
  
  it("should call model.find with passed query", async () => {
    const model: any = {
      find: sandbox.stub().returns([])
    }
    const parser = sandbox.stub().returns("test-item")
    await initModelGetAll(model, parser as any)()
    expect(model.find.firstCall?.firstArg).to.eql(undefined)
  })
  
  it("should call parser by length of result", async () => {
    const testItem = { toJSON: () => {} }
    const testResults = [testItem, testItem, testItem, testItem]
    const model: any = {
      find: sandbox.stub().returns(testResults)
    }
    const parser = sandbox.stub().returns("test-item")
    await initModelGetAll(model, parser as any)()
    expect(parser.callCount).to.eql(testResults.length)
  })
})
