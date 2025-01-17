"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);
  return null;
}

export default Index;
