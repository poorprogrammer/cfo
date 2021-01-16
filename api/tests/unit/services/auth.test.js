const Auth = require("../../../src/services/auth");

describe("auth", () => {
  let service, _ = jest.fn()
  beforeEach(() => {
    service = new Auth("correct-password");
  });
  describe("login", () => {
    it("should return token when password is correct", () => {
      service.login("correct-password").then((resp) => {
        expect(resp).toEqual("correct-password")
      })
    })
    it("should return error when password is wrong", () => {
      service.login("wrong-password").catch((error) => {
        console.log(error)
        expect(error.status).toEqual(401)
        expect(error.message).toEqual('Authentication failed')
      })
    })
  })
})
