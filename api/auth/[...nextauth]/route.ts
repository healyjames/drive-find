import NextAuth from "next-auth"

import { authConfig } from "@/utils/authHelper"

const handler = NextAuth({
    providers: authConfig.providers
})

export { handler as GET, handler as POST }