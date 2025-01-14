"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      router.replace("/dashboard");
    }
  }, [router]);
  return <div></div>;
}

export default Index;
