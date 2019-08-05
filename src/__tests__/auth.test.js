import simpleOAuth2 from 'simple-oauth2'
import auth from '../auth'

jest.mock('simple-oauth2')

const url = 'https://example.com'
const options = {
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  user: 'user',
  pass: 'pass'
}
let success = true

describe('Auth', () => {
  test('OAuth2', async () => {
    simpleOAuth2.create.mockReturnValue({
      ownerPassword: {
        // eslint-disable-next-line no-unused-vars
        getToken: async tokenConfig => {
          if (success) return success

          throw new Error('Test failed successfully')
        }
      }
    })

    // Test a successful authentication.
    expect(await auth.OAuth2(url, options)).toBe(true)

    // Test a failed authentication.
    try {
      success = false
      await auth.OAuth2(url, options)
    } catch (err) {
      expect(err.message).toBe('Access Token Error: Test failed successfully')
    }
  })
})
