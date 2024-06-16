// lib/auth.js
import { getAuth } from "@clerk/nextjs/server";

export const fetchClerkToken = async (req: any) => {
  const { userId, getToken } = getAuth(req);

  if (!userId) {
    return null;
  }

  return await getToken();
};
