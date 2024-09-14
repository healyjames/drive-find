import NextAuth from "next-auth"
import "next-auth/jwt"

import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  basePath: "/auth",
  callbacks: {
    authorized() {
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.ENV !== "prod" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}