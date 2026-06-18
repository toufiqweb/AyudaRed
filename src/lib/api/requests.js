"use server";

import { getTokenServer } from "../core/getTokenServer";
import { protectedServerFetch, serverFetch } from "../core/server";

// GET: Fetch the current user's own donation requests with filter + pagination
export const getUserDonationRequests = async (
  statusFilter,
  currentPage,
  itemsPerPage
) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return protectedServerFetch(
    `/api/my-donation-requests?status=${statusFilter}&page=${currentPage}&limit=${itemsPerPage}`,
    token
  );
};

// GET: Fetch single donation request details by ID
export const getDonationRequestById = async (id) => {
  return serverFetch(`/api/donation-requests/${id}`);
};

