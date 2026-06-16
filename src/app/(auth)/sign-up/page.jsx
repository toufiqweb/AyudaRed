import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up | Client App",
  description: "Create your secure account to get started",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      {/* Decorative ambient lighting matching your theme design */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <SignUpForm />
      </div>
    </main>
  );
}