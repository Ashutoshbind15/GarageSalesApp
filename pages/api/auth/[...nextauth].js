import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import User from "../../../models/User";

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { password, username } = credentials;
        const user = await User.findOne({ username: username });
        if (!user) return null;

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) return null;

        return {
          id: user._id,
          role: process.env.ROLE_BASIC,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
