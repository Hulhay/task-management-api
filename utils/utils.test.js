const { validate } = require("uuid");
const { generateUUID, validateUUID } = require("./utils");

describe("generateUUID", () => {
  it("should generate a valid uuid", () => {
    const uuid = generateUUID();
    expect(validate(uuid)).toBe(true);
  });
});

describe("validateUUID", () => {
  it("should return true for a valid uuid", () => {
    const uuid = "fb0c9449-6b9d-4346-aefd-13a5f2c295cb";
    expect(validateUUID(uuid)).toBe(true);
  });

  it("should return false for an invalid uuid", () => {
    const uuid = "invalid-uuid";
    expect(validateUUID(uuid)).toBe(false);
  });
});
