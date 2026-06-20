import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up | BloodLink",
  description:
    "Create your secure account to get started and start saving lives",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full bg-background relative overflow-x-hidden">
      <SignUpForm />
    </main>
  );
}
