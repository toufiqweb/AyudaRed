import { authClient } from "../auth-client";

export const useUserClientSession = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  return { user: session?.user || null, isPending, error, refetch };
};
