// components/Loader/LoadingWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loader/Loader";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Toaster } from "sonner";

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isFetching, isMutating]);

  // Define the paths that should be accessible without login
  const publicPaths = [
    "/login",
    "/login/verify",
    "/pharmacy-information",
    "/personal-information",
  ];

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // If user is not authenticated and tries to access a protected route, redirect to /login
    if (!authToken && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <div>
      <Toaster richColors position="top-right" duration={8000} />
      {isLoading && <Loading />}
      {children}
    </div>
  );
};

export default LoadingWrapper;
