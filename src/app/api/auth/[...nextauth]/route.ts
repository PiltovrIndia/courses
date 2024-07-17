// import NextAuth from "next-auth";
// import GitHubProvider from 'next-auth/providers/github'

// const handler = NextAuth({
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID as string,
//             clientSecret: process.env.GITHUB_SECRET as string,
//         })
//     ],
//     // pages: {
//     //     signIn: '/src/app/student/signIn',
//     //     // signOut: '/auth/signout',
//     //     // error: '/auth/error', // Error code passed in query string as ?error=
//     //     // verifyRequest: '/auth/verify-request', // (used for check email message)
//     //     // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//     //   }
// })

// export { handler as GET, handler as POST}
import { handlers } from "../../../../../auth"
export const { GET, POST } = handlers
