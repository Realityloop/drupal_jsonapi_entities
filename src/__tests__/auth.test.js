import simpleOAuth2 from 'simple-oauth2'
import auth from '../auth'

jest.mock('simple-oauth2')

describe('Auth', () => {
  test('OAuth2', async () => {
    simpleOAuth2.create.mockReturnValue({
      ownerPassword: {
        // eslint-disable-next-line no-unused-vars
        getToken: async tokenConfig => {
          return true
        }
      }
    })

    const result = await auth.OAuth2('http://example.com', {
      clientId: 'clientId',
      clientSecret: 'clientSecret',
      user: 'user',
      pass: 'pass'
    })

    expect(result).toBe(true)
  })
})
