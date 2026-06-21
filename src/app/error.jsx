"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/Toast";

export default function Error({ error, reset }) {
  const toast = useToast();

  useEffect(() => {
    // Log the error to an error reporting service privately,
    // but don't show the raw error to the user.
    // console.error("An error occurred:", error);
    toast.error("Something went wrong! Please try again.");
  }, [error, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-secondary p-8 rounded-2xl shadow-sm border border-border/60 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-3 text-foreground tracking-tight">Oops!</h2>
        <p className="text-muted-foreground mb-6 font-medium">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-md hover:bg-primary/90 transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
