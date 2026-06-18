"use server";

import { revalidatePath } from "next/cache";
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
