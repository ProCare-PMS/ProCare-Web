// components/Loader/LoadingWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loader/Loader";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ProtectPage from "../ProtectPage";

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isMutating = useIsMutating();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isMutating > 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isMutating]);

  // Define the paths that should be accessible without login
  const publicPaths = [
    "/login",
    "/forgot-password",
    "/verify",
    "/pharmacy-information",
    "/personal-information",
    "/verification-success",
    "/verification-failed",
    "/profile",
    "/user-passcode",
  ];

  const protectedRoutes: { [key: string]: string[] } = {
    "/dashboard": ["is_mca", "is_pharmacist", "is_manager"],
    "/settings": ["is_manager", "is_pharmacist"],
    "/analytics": ["is_manager", "is_pharmacist"],
    "/inventory": ["is_manager", "is_pharmacist", "is_mca"],
    "/pos": ["is_manager", "is_pharmacist", "is_mca"],
    "/management": ["is_manager", "is_pharmacist"],
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // If user is not authenticated and tries to access a protected route, redirect to /login
    if (!authToken && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, router]);

  // Apply role-based protection for protected routes
  // if (protectedRoutes[pathname]) {
  //   const ProtectedComponent = ProtectPage(
  //     () => <>{children}</>,
  //     protectedRoutes[pathname]
  //   );
  //   return <ProtectedComponent />;
  // }

  return (
    <div>
      <Toaster richColors position="top-right" duration={5000} />
      {isLoading && <Loading />}
      {children}
    </div>
  );
};

export default LoadingWrapper;
