'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-none border-none outline-0 flex justify-between items-center"
      onClick={() => router.back()}
    >
      <Image src="/assets/images/backArrow.svg" alt="back arrow" width={20} height={10} />
    </button>
  );
};

export default BackButton;
