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
          // Call your backend login endpoint
          const res = await authApi.post("/token/", {
            email: credentials.email,
            password: credentials.password,
          });

          const { access, refresh } = res.data;

          if (!access || !refresh) return null;

          // ✅ Only return safe user info
          return {
            id: credentials.email,
            email: credentials.email,
          };
        } catch (err: any) {
          console.error("Login failed:", err.response?.data || err.message);
          return null;
        }
      },
    }),
  ],

  // Use JWT strategy for session
  session: {
    strategy: "jwt",       // tokens stay server-side
    maxAge: 60 * 60,       // 1 hour
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // safe info only
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email as string; // safe info only
      return session;
    },
  },

  pages: {
    signIn: "/login",  // your login page
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
