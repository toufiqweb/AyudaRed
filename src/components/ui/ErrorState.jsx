import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({ 
  title = "Unable to load data", 
  message = "We encountered an issue while loading this content. Please try again.", 
  onRetry = null,
  className = "" 
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[300px] w-full bg-secondary/30 rounded-2xl border border-border/50 ${className}`}>
      <div className="w-16 h-16 bg-destructive/10 text-destructive flex items-center justify-center rounded-full mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-sm hover:bg-primary/90 transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
