import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: "openid https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt' as SessionStrategy,
        maxAge: 60 * 60, // one hour Google token
    },
    callbacks: {
        async jwt({ token, account, user }: any) {
            if (account) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_at * 1000,
                    refreshToken: account.refresh_token,
                    user
                }
            }
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            return refreshAccessToken(token)
        },
        async session({ session, token, user }: any) {
            session.user = token.user
            session.accessToken = token.accessToken
            return session
        }
    }
}

async function refreshAccessToken(token: any) {
    try {
        // https://accounts.google.com/.well-known/openid-configuration
        // We need the `token_endpoint`.
        const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refresh_token,
            } as any),
            method: "POST",
        })

        const tokens = await response.json()

        if (!response.ok) throw tokens

        return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
        }
    } catch (error) {
        console.error("Error refreshing access token", error)
        return { ...token, error: "RefreshAccessTokenError" as const }
    }
}

export default NextAuth(authOptions);
