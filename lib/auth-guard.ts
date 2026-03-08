import { auth } from "@clerk/nextjs/server";

/**
 * Require authentication for server actions.
 * Throws an error if the user is not authenticated.
 * Returns the userId if authenticated.
 */
export async function requireAuth(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
