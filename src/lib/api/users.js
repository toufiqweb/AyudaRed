import { protectedServerFetch } from "../core/server";

export const getUserByEmail = async (email, token) => {
  return protectedServerFetch(`/api/users?email=${email}`, token);
};
