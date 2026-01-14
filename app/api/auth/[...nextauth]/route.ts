import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authApi from "@/lib/axiosAuth";

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

        if (!access) return null;

        return {
          id: credentials.email,
          email: credentials.email,
          accessToken: access,
          refreshToken: refresh,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.email = token.email as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
