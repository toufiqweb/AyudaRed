"use server";

import { revalidatePath } from "next/cache";
import { getTokenServer } from "../core/getTokenServer";
import { serverMutation } from "../core/server";

// PATCH: Update a user's role or status (admin only)
export const updateUser = async (userId, payload) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  const data = await serverMutation(
    `/api/admin/all-users/${userId}`,
    payload,
    "PATCH",
    token
  );

  revalidatePath("/dashboard/all-users");
  return data;
};

// PATCH: Update donation request status (admin/volunteer management route)
export const managementUpdateStatus = async (id, status) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  const data = await serverMutation(
    `/api/management/donation-requests/${id}/status`,
    { status },
    "PATCH",
    token
  );

  revalidatePath("/dashboard/all-blood-donation-request");
  return data;
};

// DELETE: Remove a donation request (admin only)
export const adminDeleteDonationRequest = async (id) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  const data = await serverMutation(
    `/api/donation-requests/${id}`,
    {},
    "DELETE",
    token
  );

  revalidatePath("/dashboard/all-blood-donation-request");
  return data;
};

// PATCH: Confirm a donation (pending → inprogress), assigning donor info
export const confirmDonation = async (requestId, donorName, donorEmail) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: Please log in to donate.");

  return serverMutation(
    `/api/donation-requests/${requestId}/confirm-donate`,
    { donorName, donorEmail },
    "PATCH",
    token
  );
};
