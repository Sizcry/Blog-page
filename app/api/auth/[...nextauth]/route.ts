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

        try {
          const res = await authApi.post("/token/", {
            email: credentials.email,
            password: credentials.password,
          });

          const data = res.data;

          if (data?.access && data?.refresh) {
            return {
              id: credentials.email,
              email: credentials.email,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
          }

          return null;
        } catch (err: any) {
          console.error("Login failed:", err.response?.data || err.message);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
