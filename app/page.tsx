import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      router.replace("/dashboard");
    }
  }, [router]);
  return (
    <div>
      <p>
        ANY TIME YOU FIND YOUR SELF ON THIS PAGE I WANT YOU TO KNOW IS A BUG.
        🐜🐛😜
      </p>
    </div>
  );
}

export default Index;
