// lib/refreshToken.ts
import authApi from "./axiosAuth";

export async function refreshAccessToken(token: any) {
  try {
    const response = await authApi.post("/token/refresh/", {
      refresh: token.refreshToken,
    });

    const { access, refresh } = response.data;

    return {
      ...token,
      accessToken: access,
      refreshToken: refresh ?? token.refreshToken,
      accessTokenExpires: Date.now() + 10 * 1000, // 10 seconds
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
