import { expect } from "chai"
import toJson from "../../../../src/services/mongodb/crud/to-json"

describe("toJson", () => {
  it("should parse to json", () => {
    const test = { "test": true }
    expect(toJson(test)).to.eql({ test: true })
  })
})
