"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service privately,
    // but don't show the raw error to the user.
    console.error("A runtime error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-secondary/40 p-10 rounded-3xl shadow-lg border border-border/60 max-w-md w-full flex flex-col items-center">
        <div className="w-20 h-20 bg-destructive/10 text-destructive flex items-center justify-center rounded-full mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-foreground tracking-tight">Something went wrong</h2>
        <p className="text-muted-foreground mb-8 font-medium">
          We encountered an unexpected issue. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-md hover:bg-primary/90 transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
