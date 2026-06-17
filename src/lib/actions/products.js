"use server";

import { serverMutation } from "../core/server";

export const createProduct = async (newProductData) => {
  return serverMutation("/api/products", newProductData);
};
