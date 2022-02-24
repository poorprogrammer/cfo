import { describe, it, expect, vi } from "vitest";
import Presenter from '@/presenters/Login'

class MockView {
  goTo() {}
}

describe('Login Presenter', () => {
  let p = new Presenter(new MockView())

  it('should login the current username and password', () => {
    givenLoginSuccess()
    p.username = 'username'
    p.password = 'password'
    p.login()
    expect(p.API.login).toHaveBeenCalledWith('username', 'password')
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
    vi.spyOn(p.API, 'login').mockResolvedValue(res)
  }
  function givenLoginFailedWithError(err) {
    vi.spyOn(p, 'showError').mockImplementation()
    vi.spyOn(p.API, 'login').mockRejectedValue(err)
  }
  function expectToRedirectToHomePage(view) {
    expect(view.goTo).toHaveBeenCalledWith({name: 'home'})
  }
  function expectPopupShownWithError(error) {
    expect(p.showError).toHaveBeenCalledWith(error)
  }
})
