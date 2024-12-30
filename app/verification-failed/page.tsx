import React from "react";
import Image from "next/image";

function VerificationFailed() {
  return (
    <div className="h-screen bg-gray-50 px-6">
      {/* Header */}
      <header className="w-full">
        <div className="flex justify-start">
          <Image
            src="/RxPMSlogo.png"
            alt="ProHealium Logo"
            width={200}
            height={150}
            quality={75}
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-red-600">
            Verification Failed...
          </h1>
        </div>
      </header>
    </div>
  );
}

export default VerificationFailed;
