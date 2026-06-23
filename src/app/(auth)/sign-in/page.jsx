import { Suspense } from "react";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In | AyudaRed",
  description:
    "Sign in to access your account.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full bg-background relative overflow-x-hidden">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
