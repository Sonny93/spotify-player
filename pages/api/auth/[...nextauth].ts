import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID!,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: 'user-modify-playback-state,user-read-playback-state,user-read-currently-playing'
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user, account }: any) {
			if (account && user) {
				return {
					accessToken: account.access_token,
					accessTokenExpires: Date.now() + account.expires_in * 1000,
					refreshToken: account.refresh_token,
					user
				}
			}

			if (Date.now() < token.accessTokenExpires) {
				return token
			}

			return token
		},
		async session({ session, token }: any) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			session.error = token.error;

			return session
		}
	}
});