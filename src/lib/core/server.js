const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
