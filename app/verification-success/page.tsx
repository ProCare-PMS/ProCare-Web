import React from "react";
import Image from "next/image";
import Link from "next/link";

function VerificationSuccess() {
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
          <h1 className="text-4xl font-extrabold text-green-600">
            Verification Success...
          </h1>
        </div>
      </header>
      <main className="text-center my-10">
        <a
          href="/login"
          // target="_blank"
          // rel="noopener noreferrer"
          className="text-white bg-blue-500 p-3 rounded-[5px] hover:bg-blue-600 transition-colors duration-300"
        >
          Please Click on this link and login
        </a>
      </main>
    </div>
  );
}

export default VerificationSuccess;
