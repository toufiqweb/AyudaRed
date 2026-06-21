"use server";

import { serverMutation } from "../core/server";
import { getTokenServer } from "../core/getTokenServer";

export const createCheckoutSessionAction = async (data) => {
  const token = await getTokenServer();
  if (!token) throw new Error("Unauthorized: No token found.");

  return await serverMutation(
    "/api/funding/create-checkout-session",
    data,
    "POST",
    token
  );
};
