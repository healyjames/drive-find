import NextAuth from "next-auth"
import "next-auth/jwt"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import type { Provider } from "next-auth/providers"

import User from '@/models/User'
import dbConnect from "./lib/mongodb"

const providers: Provider[] = [
  Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
  GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  })
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

const config = {
  theme: { logo: "/images/auth-logo.png" },
  providers: providers,
  basePath: "/auth",
  callbacks: {
    authorized() {
      return true
    },
    jwt({ token, account, trigger, session, profile }) {
      if (trigger === "update") token.name = session.user.name
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.id || profile?.sub
      }
      return token
    },
    async session({ session, token }) {
      if(token?.accessToken) {
        session.accessToken = token.accessToken
      }
      if(token?.id) {
        session.id = token.id
      }
      return session
    },
    async signIn({ user }) {
      await dbConnect()

      const existingUser = await User.findOne({ email: user.email })
      if (!existingUser) {
        // Add new user to MongoDB
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
        })
      }

      return true
    }
  },
  pages: {
    signIn: '/login'
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
    id?: {}
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}