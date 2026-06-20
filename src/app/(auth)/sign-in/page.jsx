import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In | BloodLink",
  description:
    "Sign in to your secure dashboard to manage blood donation requests",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full bg-background relative overflow-x-hidden">
      <SignInForm />
    </main>
  );
}
