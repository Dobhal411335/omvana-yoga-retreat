"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "font-ui bg-surface text-foreground border-border",
        },
      }}
    />
  );
}
