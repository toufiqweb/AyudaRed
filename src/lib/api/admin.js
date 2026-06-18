"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { getTokenServer } from "../core/getTokenServer";
import { protectedServerFetch } from "../core/server";

// GET: Fetch all users (admin only) with optional status filter + pagination
export const getAllUsers = async (statusFilter, page, limit) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return protectedServerFetch(
    `/api/admin/all-users?status=${statusFilter}&page=${page}&limit=${limit}`,
    token
  );
};

// GET: Fetch all donation requests (admin/volunteer)
export const getAllDonationRequests = async (statusFilter, page, limit) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return protectedServerFetch(
    `/api/management/all-donation-requests?status=${statusFilter}&page=${page}&limit=${limit}`,
    token
  );
};

// GET: Fetch dashboard stats (charts + counts)
export const getDashboardStats = async () => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return protectedServerFetch("/api/admin/dashboard-stats", token);
};

// GET: Resolve the currently logged-in user's role from session
export const getCurrentUserRole = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user?.role || "volunteer";
};
