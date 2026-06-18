"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/headers";
import { getTokenServer } from "../core/getTokenServer";
import { protectedServerFetch, serverMutation } from "../core/server";

export const getAllUsers = async (statusFilter, page, limit) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await protectedServerFetch(
    `/api/admin/all-users?status=${statusFilter}&page=${page}&limit=${limit}`,
    token
  );

  return data;
};

export const updateUser = async (userId, payload) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await serverMutation(
    `/api/admin/all-users/${userId}`,
    payload,
    "PATCH",
    token
  );

  revalidatePath("/dashboard/all-users");

  return data;
};

export const getAllDonationRequests = async (statusFilter, page, limit) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await protectedServerFetch(
    `/api/management/all-donation-requests?status=${statusFilter}&page=${page}&limit=${limit}`,
    token
  );

  return data;
};

export const managementUpdateStatus = async (id, status) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await serverMutation(
    `/api/management/donation-requests/${id}/status`,
    { status },
    "PATCH",
    token
  );

  revalidatePath("/dashboard/all-blood-donation-request");

  return data;
};

export const adminDeleteDonationRequest = async (id) => {
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

  revalidatePath("/dashboard/all-blood-donation-request");

  return data;
};

export const getCurrentUserRole = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user?.role || "volunteer";
};

export const getDashboardStats = async () => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: No token found.");
  }

  const data = await protectedServerFetch("/api/admin/dashboard-stats", token);
  return data;
};

export const confirmDonation = async (requestId, donorName, donorEmail) => {
  const token = await getTokenServer();
  if (!token) {
    throw new Error("Unauthorized: Please log in to donate.");
  }

  const data = await serverMutation(
    `/api/donation-requests/${requestId}/confirm-donate`,
    { donorName, donorEmail },
    "PATCH",
    token
  );

  return data;
};



