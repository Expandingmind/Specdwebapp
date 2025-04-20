import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Add custom properties here that your app needs
      id?: string;
    } & DefaultSession["user"];
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    // Add custom properties here that your app needs
    id?: string;
  }
} 