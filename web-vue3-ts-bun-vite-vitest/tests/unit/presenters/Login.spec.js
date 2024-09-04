import LoginPresenter from "@/presenters/Login";
import { describe, it, vi, expect } from "vitest";

class MockView {
  goTo() {

  }
}

describe("Login Presenter", () => {
  let p = new LoginPresenter(new MockView());

  it("should login the current username and password", () => {
    vi.spyOn(p.API, "login").mockResolvedValue({
      token: "ok"
    });
    p.username = "username";
    p.password = "password";

    p.login();

    expect(p.API.login).toHaveBeenCalledWith("username", "password");
  });
});
