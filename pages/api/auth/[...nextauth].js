import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { spotifyApi, LOGIN_URL } from '../../../lib/spotify'

const refreshAccessToken = async token => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log(`Refreshed Token`)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1 hour as 3600 ms
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // if new refresh token, replace, otherwise use old one
    }
  } catch (err) {
    console.error(err)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // using milliseconds for expiration time
        }
      }

      // return previous token if the access token hasn't expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log('Access token is still valid...')
        return token
      }

      // If access token expires, refresh it
      console.log('Access token has expired, refreshing...')
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})
