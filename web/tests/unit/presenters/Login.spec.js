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
    await p.login('username', 'correct password')
    expectToRedirectToHomePage(p.view)
  })
  it('should show error after login failed', async () => {
    givenLoginFailedWithError('Error: Request failed with status code 401')
    await p.login('username', 'wrong password')
    expectPopupShownWithError('Error: Request failed with status code 401')
  })
  function givenLoginSuccess() {
    jest.spyOn(p.view, 'goTo')
    jest.spyOn(p.API, 'login').mockResolvedValue()
  }
  function givenLoginFailedWithError(err) {
    jest.spyOn(p, 'showError').mockImplementation()
    jest.spyOn(p.API, 'login').mockRejectedValue(err)
  }
  function expectToRedirectToHomePage(view) {
    expect(view.goTo).toHaveBeenCalledWith({name: 'home'})
  }
  function expectPopupShownWithError(error) {
    expect(p.showError).toHaveBeenCalledWith(error)
  }
})
