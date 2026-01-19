// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email?: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    email?: string;
    error?: "RefreshAccessTokenError";
  }
}
