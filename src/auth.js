export default {
  OAuth2: async (url, credentials) => {
    const oauth2 = require('simple-oauth2').create({
      client: {
        id: credentials.clientId,
        secret: credentials.clientSecret
      },
      auth: {
        tokenHost: url
      }
    })

    const tokenConfig = {
      username: credentials.user,
      password: credentials.pass
    }

    try {
      const result = await oauth2.ownerPassword.getToken(tokenConfig)
      return result
    } catch (err) {
      throw new Error(`Access Token Error: ${err.message}`)
    }
  }
}