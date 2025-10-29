import bcrypt from "bcrypt";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { adminUsers } from "../db/schema";

/**
 * Augmentação de módulo para os tipos do `next-auth`.
 * Permite adicionar propriedades personalizadas ao objeto `session`
 * e manter a segurança de tipos.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    nickname: string;
    fullName: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      nickname: string;
      fullName: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        nickname: { label: "Nome de usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const user = await db.query.adminUsers.findFirst({
          where: eq(adminUsers.nickname, credentials.nickname as string),
        });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!isPasswordCorrect) return null;
        return {
          id: user.id,
          nickname: user.nickname,
          fullName: user.fullName,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nickname = user.nickname;
        token.fullName = user.fullName;
      }
      return token;
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        nickname: token.nickname as string,
        fullName: token.fullName as string,
      },
    }),
  },
} satisfies NextAuthConfig;
