"use client";

import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`border rounded-md p-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none ${className || ""}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
