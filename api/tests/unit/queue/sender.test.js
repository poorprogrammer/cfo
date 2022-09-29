const Sender = require('../../../src/queue/sender')

describe('connect to server', () => {
  it('should connect to queue once so that the server is not spam with connections', () => {
    Sender.connect = jest.fn(() => (Sender.connection = 'created'))
    Sender.create()
    Sender.create()
    expect(Sender.connect.mock.calls.length).toEqual(1)
  })
  it('should create channel once so that the server is not spam channels', () => {
    Sender.connection = jest.fn()
    Sender.connection.createChannel = jest.fn(
      () => (Sender.channel['greet-sent'] = new MockChannel())
    )
    Sender.createChannel('greet-sent')
    Sender.createChannel('greet-sent')
    expect(Sender.connection.createChannel.mock.calls.length).toEqual(1)
  })
  xit('should send message correctly', async () => {
    const channel = new MockChannel()
    const p = Promise.resolve(() => channel)
    Sender.createChannel = jest.fn(() => p)
    expect.assertions(1)
    const s = new Sender()

    Sender.createChannel('greet-sent').then((channel) => {
      console.log(`in test ${channel}`)
    })

    await s.send('greet-sent', 'hello!')

    expect(channel.sendToQueue.mock.calls.length).toEqual(1)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
})

class MockChannel {
  sendToQueue = jest.fn()
}
