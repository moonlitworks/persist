import { expect } from "chai"
import identity from "../../../../src/services/mongodb/crud/identity"

describe("toJson", () => {
  it("should return itself", () => {
    const test = { "test": true }
    expect(identity(test)).to.eql(test)
  })
})
