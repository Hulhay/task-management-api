const mockingoose = require("mockingoose");
const { User } = require("../models");
const { getUserByEmailFromDB, insertUserToDB } = require("./user");

describe("insertUserToDB", () => {
  const mockUserData = {
    id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
    name: "dev",
    email: "dev@mail.com",
    password: "encryptedPassword",
    isLogin: false,
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should insert a user", async () => {
    mockingoose(User).toReturn(mockUserData, "save");

    const req = {
      name: "dev",
      email: "dev@mail.com",
      password: "encryptedPassword",
    };

    const response = await insertUserToDB(req);
    expect(response.id).toEqual("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(response).toHaveProperty(
      "id",
      "name",
      "email",
      "password",
      "isLogin"
    );
  });
});

describe("getUserByEmailFromDB", () => {
  const mockUserData = [
    {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      name: "dev",
      email: "dev@mail.com",
      password: "encryptedPassword",
      isLogin: false,
    },
  ];

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return user by email", async () => {
    mockingoose(User).toReturn(mockUserData, "find");

    const email = "dev@mail.com";
    const result = await getUserByEmailFromDB(email);
    expect(result.id).toBe("fb0c9449-6b9d-4346-aefd-13a5f2c295ca");
    expect(result.email).toBe("dev@mail.com");
    expect(result).toHaveProperty("id", "name", "email", "password", "isLogin");
  });

  it("should return empty for non exists email", async () => {
    mockingoose(User).toReturn([], "find");

    const email = "not@found.com";
    const result = await getUserByEmailFromDB(email);
    expect(result).toEqual(undefined);
  });
});
