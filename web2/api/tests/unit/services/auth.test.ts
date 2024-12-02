import { Auth } from "../../../src/services/auth";

describe("auth", () => {
  let service: Auth;

  beforeEach(() => {
    service = new Auth("correct-password");
  });

  describe("login", () => {
    it("should return token when password is correct", async () => {
      const resp = await service.login("correct-password");
      expect(resp).toEqual("correct-password");
    });

    it("should return error when password is wrong", async () => {
      try {
        await service.login("wrong-password");
        fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.status).toEqual(401);
        expect(error.message).toEqual("Authentication failed");
      }
    });
  });
});
