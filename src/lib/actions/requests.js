"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "../auth";
import { serverMutation } from "../core/server";
import { getTokenServer } from "../core/getTokenServer";

// POST: Create a new blood donation request
export const createDonationRequest = async (formData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const token = await getTokenServer();

  if (!token) throw new Error("Unauthorized: No token found.");
  if (!session?.user?.email) throw new Error("Unauthorized: No active session found.");

  const data = await serverMutation(
    "/api/donation-requests",
    formData,
    "POST",
    token
  );

  revalidatePath("/dashboard");
  return data;
};

// PATCH: Update status on the donor's own request (inprogress → done/canceled)
export const updateDonationRequestStatus = async (id, status) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  const data = await serverMutation(
    `/api/donation-requests/${id}/status`,
    { status },
    "PATCH",
    token
  );

  revalidatePath("/dashboard");
  return data;
};

// DELETE: Remove the donor's own donation request
export const deleteDonationRequest = async (id) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  const data = await serverMutation(
    `/api/donation-requests/${id}`,
    {},
    "DELETE",
    token
  );

  revalidatePath("/dashboard");
  return data;
};

// PATCH: Update the details of a donation request
export const updateDonationRequest = async (id, formData) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  const data = await serverMutation(
    `/api/donation-requests/${id}`,
    formData,
    "PATCH",
    token
  );

  revalidatePath("/dashboard");
  return data;
};

