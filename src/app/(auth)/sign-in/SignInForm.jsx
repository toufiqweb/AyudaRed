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

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authClient.signIn.email({
        email,
        password,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Invalid email or password. Please try again.");
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
            <span>BloodLink</span>
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
          © {new Date().getFullYear()} BloodLink Platform. All rights reserved.
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

          {/* Error Message Alert */}
          {error && (
            <div className="p-4 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
              {error}
            </div>
          )}

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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  disabled={loading}
                />
              </div>
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
                  onChange={(e) => setPassword(e.target.value)}
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
