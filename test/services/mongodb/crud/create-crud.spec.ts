import sinon from "sinon"
import { expect } from "chai"
import createMongoCrud from "../../../../src/services/mongodb/crud/create-crud"
import identity from "../../../../src/services/mongodb/crud/identity"
import * as initModelCreate from "../../../../src/services/mongodb/crud/init-model-create"
import * as initModelGet from "../../../../src/services/mongodb/crud/init-model-get"
import * as initModelUpdate from "../../../../src/services/mongodb/crud/init-model-update"
import * as initModelDelete from "../../../../src/services/mongodb/crud/init-model-delete"
import * as initModelQuery from "../../../../src/services/mongodb/crud/init-model-query"

describe("createMongoCrud", () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("should return object with crud operations", () => {
    const testDb: any = {
      model: sandbox.stub().returns("test-model")
    }

    sandbox.stub(initModelCreate, "default").returns("operation" as any)
    sandbox.stub(initModelGet, "default").returns("operation" as any)
    sandbox.stub(initModelUpdate, "default").returns("operation" as any)
    sandbox.stub(initModelDelete, "default").returns("operation" as any)
    sandbox.stub(initModelQuery, "default").returns("operation" as any)

    const crud = createMongoCrud(testDb, {} as any)
    expect(crud).to.eql({
      create: "operation",
      get: "operation",
      update: "operation",
      delete: "operation",
      query: "operation",
    })
  })

  it("should call initModelGet with model and documentParser", () => {
    const testDb: any = {
      model: sandbox.stub().returns("test-model")
    }
    const initModelGetStub = sandbox.stub(initModelGet, "default")
    const documentParser = sandbox.stub()
    createMongoCrud(testDb, { documentParser } as any)
    expect(initModelGetStub.firstCall?.firstArg).to.eql("test-model")
    expect(initModelGetStub.firstCall?.lastArg).to.eql(documentParser)
  })

  it("should default documentParser to identity if not defined", () => {
    const testDb: any = {
      model: sandbox.stub().returns("test-model")
    }
    const initModelGetStub = sandbox.stub(initModelGet, "default")
    createMongoCrud(testDb, {} as any)
    expect(initModelGetStub.firstCall?.lastArg).to.eql(identity)
  })
})
