import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserAuthenticator } from "@/modules/user/application/UserAuthenticator"
import { UserRedisRepository } from "@/modules/user/infrastructure/UserRedisRepository"
import { UserDiscordAuthenticator } from "@/modules/user/application/UserDiscordAuthenticator"
import { signIn } from 'next-auth/react';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    // ...add more providers here
		CredentialsProvider({
			name: 'Custom login',
			credentials: {
				username: { label: "Username", type: "text", placeholder: "Username" },
				password: { label: "Password", type: "password", placeholder: "Password" },
			},
			async authorize(credentials) {
				const userAuthenticator = new UserAuthenticator(new UserRedisRepository());
				if(!credentials?.username || !credentials.password) {
					return null;
				}
				const user = await userAuthenticator.run(credentials.username, credentials?.password)
				return user
			}
		})
  ],

	pages: {
		signIn: '/'
	},

	callbacks: {
		async jwt({ token, user, account }) {
			if(account) {
				switch( account.type ) {
					case 'oauth':
						const userDiscordAuthenticator = new UserDiscordAuthenticator(new UserRedisRepository())
						token.user = await userDiscordAuthenticator.run(user.id, user.email);
						break;

					case 'credentials':
						token.user = user;
						break;
				}
			}
			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.user = token.user;
			return session;
		}
	}
}
export default NextAuth(authOptions)