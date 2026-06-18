// Server-side fetch utilities (NOT Server Actions - do not use "use server" here)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data, method = "POST", token = null) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  return handleStatus(res);
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  return handleStatus(res);
};

export const protectedServerFetch = async (path, token) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleStatus(res);
};

const handleStatus = (res) => {
  if (!res.ok) {
    throw new Error("Server error");
  }
  return res.json();
};
