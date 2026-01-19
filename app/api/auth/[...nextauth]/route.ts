import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authApi from "@/lib/axiosAuth";
import { refreshAccessToken } from "@/lib/refreshToken";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await authApi.post("/token/", {
          email: credentials.email,
          password: credentials.password,
        });

        const { access, refresh } = res.data;

        return {
          id: credentials.email,
          email: credentials.email,
          accessToken: access,
          refreshToken: refresh,
          accessTokenExpires: Date.now() + 10 * 1000, // 10 seconds
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      // First login
      if (user) {
        return {
          id: user.id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          email: user.email,
        };
      }

      // Token still valid
      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }

      // Token expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
