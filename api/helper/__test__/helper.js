import nock from 'nock'

const host = 'http://127.0.0.1'
const addNockServer = () => {
  nock(host)
    .get('/foo')
    .reply(200, {
      message: 'foo'
    })
    .get('/foo_param?user=blob')
    .reply(200, {
      message: 'foo_param',
      user: 'blob'
    })
    .post('/bar')
    .reply(200, {
      message: 'bar'
    })
    .post('/bar_param', {
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    })
    .reply(200, {
      message: 'bar_param',
      username: 'pgte',
      email: 'pedro.teixeira@gmail.com'
    })
}

export default {
  host,
  addNockServer
}
