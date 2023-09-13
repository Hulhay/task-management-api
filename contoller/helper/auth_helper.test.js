const { buildRegisterResponse, buildLoginResponse } = require("./auth_helper");

describe("buildRegisterResponse", () => {
  it("should build response register", () => {
    const mockUser = {
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      name: "dev",
      email: "dev@mail.com",
      password: "encryptedPassword",
      isLogin: false,
    };

    const response = buildRegisterResponse(mockUser);
    expect(response).toEqual({
      id: "fb0c9449-6b9d-4346-aefd-13a5f2c295ca",
      name: "dev",
      email: "dev@mail.com",
    });
  });
});

describe("buildLoginResponse", () => {
  it("should build response login", () => {
    const accessToken = "this.Is.Token.123";
    const expAccessToken = "2021-09-03T00:00:00.000Z";

    const response = buildLoginResponse(accessToken, expAccessToken);
    expect(response).toEqual({
      access_token: "this.Is.Token.123",
      access_token_exp: "2021-09-03 07:00:00",
    });
  });
});
