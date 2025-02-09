import Credentials from "next-auth/providers/credentials";
import {z} from 'zod'
import NextAuth, {NextAuthConfig} from "next-auth";
import {loginUser} from "@/lib/actions/auth";
import {redirect} from "next/navigation";

const authenticatedRoutes = [
    '/',
]


export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isAnAuthenticatedRoute = authenticatedRoutes.includes(nextUrl.pathname)
            if (!isLoggedIn && isAnAuthenticatedRoute) {
                return Response.redirect(new URL('/auth/login', nextUrl));
            }

            return true;
        },
        jwt: async ({token, user}) => {
            if (user) token.data = user
            return token
        },
        session: async ({session, token}) => {
            session.user = token.data as any
            return session
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(5)})
                    .safeParse(credentials);
                if (!parsedCredentials.success) return null

                const {email, password} = parsedCredentials.data
                const data = await loginUser({email, password})

                const {user, token} = data

                if (!token) {
                    const e = new Error()
                    e.message = data.message
                    throw e
                }


                return {...user, access_token: token}
            },
        }),
    ],
}

export const {signIn, signOut, auth, handlers} = NextAuth(authConfig)