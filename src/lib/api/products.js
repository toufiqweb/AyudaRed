import { serverFetch } from "../core/server";

export const getProducts = async (queryString) => {
  return serverFetch(`/api/products?${queryString}`);
};
