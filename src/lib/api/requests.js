"use server";

import { getTokenServer } from "../core/getTokenServer";
import { protectedServerFetch, serverFetch } from "../core/server";

// GET: Fetch the current user's own donation requests with filter + pagination
export const getUserDonationRequests = async (
  statusFilter,
  currentPage,
  itemsPerPage,
) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return protectedServerFetch(
    `/api/my-donation-requests?status=${statusFilter}&page=${currentPage}&limit=${itemsPerPage}`,
    token,
  );
};

// GET: Fetch dashboard stats for a specific donor
export const getDonorDashboardStats = async () => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return protectedServerFetch("/api/donor/dashboard-stats", token);
};

// GET: Fetch single donation request details by ID
export const getDonationRequestById = async (id) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");
  return protectedServerFetch(`/api/donation-requests/${id}`, token);
};

// GET: Fetch public pending donation requests with pagination & filters
export const getPendingDonationRequests = async (
  currentPage,
  itemsPerPage,
  filters = {},
) => {
  const { district = "", upazila = "", bloodGroup = "", search = "" } = filters;

  const queryParams = new URLSearchParams({
    page: currentPage,
    size: itemsPerPage,
    ...(district && { district }),
    ...(upazila && { upazila }),
    ...(bloodGroup && { bloodGroup }),
    ...(search && { search }),
  }).toString();

  return serverFetch(`/api/donation-requests?${queryParams}`);
};
