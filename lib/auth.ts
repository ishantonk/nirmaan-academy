import { NextRequest } from "next/server";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

/**
 * Configuration object for NextAuth
 * - Sets up Prisma adapter
 * - Uses JWT-based sessions
 * - Defines OAuth and Credentials providers
 * - Adds custom pages and callbacks
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter, // Connect NextAuth to Prisma

  // Use JWT-based stateless sessions instead of database sessions
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Redirect URLs for sign-in and error pages
  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    /**
     * Google OAuth provider
     * Maps Google profile to our app's user schema
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        // Map Google profile to our app's user structure
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "STUDENT", // default role if missing
        };
      },
    }),

    /**
     * Credentials provider for email/password login
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate presence of email & password
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch user from database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;

        // Compare provided password with hashed password
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) return null;

        // Return user object to include in JWT
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    /**
     * JWT callback
     * Stores user info in token and syncs with DB on subsequent requests
     */
    async jwt({ token, user }) {
      if (user) {
        // First login: store user info in token
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      } else if (token.email) {
        // Subsequent requests: sync token with database in case role or data changed
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.image;
        }
      }

      return token;
    },

    /**
     * Session callback
     * Maps JWT token to session object accessible in client & server
     */
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "ADMIN" | "STUDENT"; // restrict to valid roles
        session.user.image = token.picture as string | undefined;
      }
      session.accessToken = token.__raw as string; // raw JWT from NextAuth
      return session;
    },
  },
};

/**
 * Helper function to get the current server session
 */
export const getAuthSession = () => getServerSession(authOptions);

/**
 * Role-based authorization guard
 * Throws "Unauthorized" if user is not logged in
 * Throws "Forbidden" if user does not have required role
 * @param request NextRequest object
 * @param roles Optional array of allowed roles
 */
export async function authGuard(
  request: NextRequest,
  roles?: ("ADMIN" | "STUDENT")[] // optional roles allowed
) {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized"); // no logged-in user

  if (roles && !roles.includes(session.user.role)) {
    throw new Error("Forbidden"); // user does not have required role
  }

  // Return session for downstream logic (API routes, server components, etc.)
  return session;
}
