import React from "react";

const CustomerDetails = () => {
  return (
    <div className="bg-white p-4 grid gap-y-4 place-items-center text-center">
      {/* Name and Image with initials */}
      <div className="bg-[#EFF0FE] rounded-[8px] mx-auto w-full text-center grid place-items-center relative py-4 px-6">
        {/* Customer Imge Avatar */}
        <div className="bg-[#2648EA] absolute w-[50px] h-[50px] grid place-items-center text-center rounded-[50%] left-[40%] -inset-4">
          <span className="text-[#FFFFFF] text-xl text-center  font-bold">
            MS
          </span>
        </div>

        {/* Customer Name and ID */}
        <div className="mt-4">
          <h2 className="mt-4">Manuel Akwasi Smith</h2>
          <p className="text-[#202224]">
            <span className="text-[#858C95]">ID:</span> Customer #58547
          </p>
        </div>
      </div>

      {/* Phone Number */}
      <div className="text-center">
        <h3 className="text-[#858C95] text-sm font-normal ">Phone Number</h3>
        <p className="text-[#202224] text-base font-normal">+1 123-456-7890</p>
      </div>

      {/* Email Address */}
      <div>
        <h3 className="text-[#858C95] text-sm font-normal ">Email Addres</h3>
        <p className="text-[#202224] text-base font-normal">derixk@gmail.com</p>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-[#858C95] text-sm font-normal ">Address</h3>
        <p className="text-[#202224] text-base font-normal">
          123 Ring Road, Accra
        </p>
      </div>
      
      {/* Age */}
      <div>
        <h3 className="text-[#858C95] text-sm font-normal ">Age</h3>
        <p className="text-[#202224] text-base font-normal">
          100
        </p>
      </div>

      {/* Gender */}
      <div>
        <h3 className="text-[#858C95] text-sm font-normal ">Gender</h3>
        <p className="text-[#202224] text-base font-normal">Male</p>
      </div>

      {/* Total Purchases */}
      <div>
        <h3 className="text-[#858C95] text-sm font-normal ">Total Purchases</h3>
        <p className="text-[#202224] text-base font-normal">234</p>
      </div>

      {/* Returns Made */}
      <div>
        <h3 className="text-[#858C95] text-sm font-normal ">Returns Made</h3>
        <p className="text-[#202224] text-base font-normal">2</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
