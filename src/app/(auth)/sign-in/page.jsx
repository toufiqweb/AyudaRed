import SignInForm from "./SignInForm";

// You can easily add static or dynamic metadata since it is a Server Component
export const metadata = {
  title: "Sign In | Client App",
  description: "Securely sign in to your profile dashboard",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      {/* Decorative subtle background accents matching your theme */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <SignInForm />
      </div>
    </main>
  );
}