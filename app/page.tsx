"use client";

import Login from "@/components/Login/login";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Index() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default Index;
