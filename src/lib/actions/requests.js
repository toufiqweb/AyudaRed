"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "../auth";
import { serverMutation, protectedServerFetch } from "../core/server";
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

  const data = await serverMutation(
    "/api/donation-requests",
    formData,
    "POST",
    token,
  );

  revalidatePath("/dashboard");
  
  return data;
};

export const getUserDonationRequests = async (statusFilter, currentPage, itemsPerPage) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await protectedServerFetch(
    `/api/my-donation-requests?status=${statusFilter}&page=${currentPage}&limit=${itemsPerPage}`,
    token
  );

  return data;
};

export const updateDonationRequestStatus = async (id, status) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await serverMutation(
    `/api/donation-requests/${id}/status`,
    { status },
    "PATCH",
    token
  );

  revalidatePath("/dashboard");
  
  return data;
};

export const deleteDonationRequest = async (id) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await serverMutation(
    `/api/donation-requests/${id}`,
    {},
    "DELETE",
    token
  );

  revalidatePath("/dashboard");
  
  return data;
};
