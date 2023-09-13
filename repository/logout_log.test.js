const mockingoose = require("mockingoose");
const { LogoutLog } = require("../models");
const {
  insertLogoutLogToDB,
  getLogoutLogByAuthIdentifier,
} = require("./logout_log");

describe("insertLogoutLogToDB", () => {
  const mockLogData = {
    authIdentifier: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    isLogout: true,
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should insert new log", async () => {
    mockingoose(LogoutLog).toReturn(mockLogData, "save");

    const authIdentifier = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";

    const response = await insertLogoutLogToDB(authIdentifier);
    expect(response.authIdentifier).toEqual(
      "fb0c9449-6b9d-4346-aefd-13a5f2c295ca"
    );
  });
});

describe("getLogoutLogByAuthIdentifier", () => {
  const mockLogData = [
    {
      authIdentifier: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      isLogout: true,
    },
  ];

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return log by authIdentifier", async () => {
    mockingoose(LogoutLog).toReturn(mockLogData, "find");

    const authIdentifier = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";

    const response = await getLogoutLogByAuthIdentifier(authIdentifier);
    expect(response.authIdentifier).toEqual(
      "fb0c9449-6b9d-4346-aefd-13a5f2c295ca"
    );
  });

  it("should return empty for non exists authIdentifier", async () => {
    mockingoose(LogoutLog).toReturn([], "find");

    const authIdentifier = "fb0c9449-6b9d-4346-aefd-13a5f2c295ca";

    const response = await getLogoutLogByAuthIdentifier(authIdentifier);
    expect(response).toEqual(undefined);
  });
});
