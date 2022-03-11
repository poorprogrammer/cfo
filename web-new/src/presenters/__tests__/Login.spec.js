import { describe, it, expect, vi } from "vitest";
import Presenter from '@/presenters/Login'

describe('Login Presenter', () => {
  let p = new Presenter(new MockView())

  it('should login the current username and password', () => {
    givenLoginSuccess()
    p.username = 'username'
    p.password = 'password'
    p.login()
    p.API.expectToHaveBeenCalledWith('username', 'password')
  })
  it('should redirect to home page after login success', async () => {
    givenLoginSuccess()
    await p.login()
    expectToRedirectToHomePage(p.view)
  })
  it('should store token in local storage after login success', async () => {
    givenLoginSuccess('ok')
    await p.login()
    expect(localStorage.getItem('token')).toEqual('ok')
  })
  it('should show error after login failed', async () => {
    givenLoginFailedWithError('Error: Request failed with status code 401')
    await p.login()
    expectPopupShownWithError('Error: Request failed with status code 401')
  })
  function givenLoginSuccess(res) {
    vi.spyOn(p.view, 'goTo')
    p.API = new MockAPILoginSuccess(res)
  }
  function givenLoginFailedWithError(err) {
    vi.spyOn(p, 'showError').mockImplementation()
    p.API = new MockAPILoginFail(err)
  }
  function expectToRedirectToHomePage(view) {
    expect(view.goTo).toHaveBeenCalledWith({name: 'home'})
  }
  function expectPopupShownWithError(error) {
    expect(p.showError).toHaveBeenCalledWith(error)
  }
})

class MockView {
  goTo() {}
}

class MockAPILoginSuccess {
  constructor(result) {
    this.result = result;
    console.log(`new MockAPI, result = ${this.result}`)
  }
  login(username, password) {
    this.username = username;
    this.password = password;
    console.log(`login, result = ${this.result}`)
    return Promise.resolve(this.result);
  }
  expectToHaveBeenCalledWith(username, password) {
    expect(this.username).toEqual(username);
    expect(this.password).toEqual(password);
  }
}

class MockAPILoginFail{
  constructor(error) {
    this.error = error;
  }
  login() {
    return Promise.reject(this.error);
  }
}
