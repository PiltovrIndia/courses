import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username?: string | null;
  }

  interface JWT {
    username?: string | null;
  }
}
