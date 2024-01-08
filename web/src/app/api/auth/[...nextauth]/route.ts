import { api } from "@/lib/api";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

type AuthResponseDTO = {
  accessToken: string;
  refreshToken: string;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, user }) {
      token.accessToken = account?.access_token;
      token.idToken = account?.id_token || "";
      const access_token = account?.access_token;

      try {
        const tokenResponse = await api.post("/register", {
          access_token,
        });
  
        const tokenValue = tokenResponse.data;

        cookies().set("token", tokenValue, {
          maxAge: 60 * 60 * 24 * 30,
        });
      } catch (error) {
        console.error(error);
      }
      return token;
    },

    async session({ session, token, user }) {
      return Promise.resolve(session);
    },
  },

  /*  jwt: {
    async encode({ secret, token }) { 
      if (!token) {
        throw new Error("No token");
      }
      console.log(jwt.sign(token, secret))
      return jwt.sign(token, secret);
    },

    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token");
      }

      const decodeToken = jwt.verify(token, secret);
      if (typeof decodeToken === "string") {
        return JSON.parse(decodeToken);
      } else decodeToken;
    },
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },  */
});

export { handler as GET, handler as POST };

