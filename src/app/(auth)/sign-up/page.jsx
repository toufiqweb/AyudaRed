import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up | AyudaRed",
  description: "Create an account to join the network.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full bg-background relative overflow-x-hidden">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
