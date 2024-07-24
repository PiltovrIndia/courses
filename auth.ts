import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Ensure profile.login is a string
        token.username = profile.login as string;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure token.username is a string
      session.user.username = token.username as string;
      return session;
    }
  },
});
