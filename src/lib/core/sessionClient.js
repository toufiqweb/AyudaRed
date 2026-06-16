import { authClient } from "../auth-client";

export const getUserClientSession = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  return { user: session?.user || null, isPending, error, refetch };
};
