"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Adjust path to your better-auth client instance
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  Droplet,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    return "";
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setEmail(val);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const handleEmailBlur = () => {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (data) {
        toast.success("Signed in successfully!");
        router.push("/dashboard");
        router.refresh();
      }
      if (error) {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("SignIn Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground overflow-x-hidden">
      {/* ================= LEFT SIDE: SaaS Brand & Value Panel ================= */}
      <div className="hidden lg:flex w-1/2 relative bg-secondary border-r border-border p-16 flex-col justify-between overflow-hidden">
        {/* Subtle Decorative Grid Pattern & Radial Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

        {/* Top: Branding */}
        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold font-heading tracking-tight text-foreground"
          >
            <Droplet className="w-6 h-6 text-primary fill-primary transform rotate-180" />
            <span className="font-semibold text-base sm:text-lg tracking-tight font-heading">
              Ayuda<span className="text-primary font-heading">Red</span>
            </span>
          </Link>
        </div>

        {/* Center: Hero SaaS Copy */}
        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-[1.15] tracking-tight font-heading">
            Welcome back to the{" "}
            <span className="text-primary">smart network</span> of lifesavers.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            Sign in to access your custom control panel, tracking requests,
            updates, and live urgent matching notifications.
          </p>

          {/* SaaS Feature Checklist */}
          <div className="space-y-3 pt-4">
            {[
              "Real-time global donor search",
              "Instant matching with local requests",
              "Secure and decentralized data privacy",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm font-medium opacity-90"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Footer / Micro-copy */}
        <div className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} AyudaRed Platform. All rights reserved.
        </div>
      </div>

      {/* ================= RIGHT SIDE: Sign In Form Container ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 xl:px-24 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:underline font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-10 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-95 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/15"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:underline font-semibold transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
