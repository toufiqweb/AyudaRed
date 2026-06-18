import { serverFetch } from "../core/server";

export const getUserByEmail = async (email) => {
  return serverFetch(`/api/users?email=${email}`);
};
