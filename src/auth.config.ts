import Credentials from "next-auth/providers/credentials";
import {z} from 'zod'
import NextAuth, {NextAuthConfig} from "next-auth";
import {loginUser} from "@/lib/actions/auth";

const authenticatedRoutes = [
    '/',
]

const adminRoutes = [
    '/admin/orders',
    '/admin/users',
    '/admin/products',
]

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isAdmin = auth?.user?.rols?.includes('admin');
            const isAnAuthenticatedRoute = authenticatedRoutes.includes(nextUrl.pathname)
            const isAnAdminRoute = adminRoutes.includes(nextUrl.pathname)
            if (!isLoggedIn && isAnAuthenticatedRoute) {
                return Response.redirect(new URL('/auth/login', nextUrl));
            }

            if (!isAdmin && isAnAdminRoute) {
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
        }
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
                return {...user, access_token: token}
            },
        }),
    ],
}

export const {signIn, signOut, auth, handlers} = NextAuth(authConfig)