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
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        name: { label: "Nome de usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const user = await db.query.adminUsers.findFirst({
          where: eq(adminUsers.name, credentials.name as string),
        });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!isPasswordCorrect) return null;
        return { id: user.id, name: user.name };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
      },
    }),
  },
} satisfies NextAuthConfig;
