import React from "react";
export const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) => (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${variant === "destructive" ? "bg-red-100 text-red-700" : variant === "secondary" ? "bg-gray-200 text-gray-800" : "bg-blue-100 text-blue-700"}`}>
        {children}
    </span>
);