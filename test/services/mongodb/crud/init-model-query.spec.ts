import sinon from "sinon"
import { expect } from "chai"
import initModelQuery from "../../../../src/services/mongodb/crud/init-model-query"

describe("initModelQuery", () => {
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
    const testQuery: any = { test: true }
    await initModelQuery(model, parser as any)(testQuery)
    expect(model.find.firstCall?.firstArg).to.eql(testQuery)
  })
  
  it("should call parser by length of result", async () => {
    const testResults = ["0", "1", "2", "3"]
    const model: any = {
      find: sandbox.stub().returns(testResults)
    }
    const parser = sandbox.stub().returns("test-item")
    const testQuery: any = { test: true }
    await initModelQuery(model, parser as any)(testQuery)
    expect(parser.callCount).to.eql(testResults.length)
  })
})
