"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "../auth";
import { serverMutation } from "../core/server";
import { getTokenServer } from "../core/getTokenServer";

export const createDonationRequest = async (formData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = await getTokenServer();
  
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }
  if (!session?.user?.email) {
    throw new Error("Unauthorized: No active session found.");
  }

  // Call the Express backend POST /api/donation-requests
  const data = await serverMutation(
    "/api/donation-requests",
    formData,
    "POST",
    token,
  );

  // Revalidate relevant pages
  revalidatePath("/dashboard");
  
  return data;
};
