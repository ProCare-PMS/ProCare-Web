import React from 'react'
import { BarChartHorizontal } from 'lucide-react';
import Image from 'next/image';

const DashboardSalesStats = () => {
    return (
        <div className="flex flex-col md:flex-row items-center font-inter justify-between gap-4 py-5">
            {/* Daily Sale */}
            <div className='flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-full'>
                <div className='flex items-center mb-4 justify-between'>
                    <h3 className='font-semibold  text-base'>Daily Sales</h3>
                    <span className='text-2xl text-[#858C95]'>...</span>
                </div>

                <div className='flex items-center justify-between gap-2'>
                    <div>
                        <h3 className='text-2xl mb-4 font-semibold'>$300</h3>
                        <div className='flex  items-center gap-4 text-[#858C95] font-bold text-sm'>
                            <span className="bg-[#ECF4FC] rounded-[7rem] text-xs font-medium px-3 py-1 text-[#0A77FF]">Personal</span>
                            monthly growth
                        </div>
                    </div>
                    <div className=''>
                        <Image
                            width={40}
                            height={40}
                            src="/icons/Line.png"
                            alt="Line chart for daily sales"
                        />
                    </div>
                </div>
            </div>

            {/* Items Sold*/}
            <div className='flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-full'>
                <div className='flex items-center mb-4 justify-between'>
                    <h3 className='font-semibold  text-base'>Items Sold</h3>
                    <span className='text-2xl text-[#858C95]'>...</span>
                </div>

                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='text-2xl mb-4 leading-9 font-semibold'>680 Items</h3>
                        <div className='flex gap-4 text-[#858C95] font-bold text-sm'>
                            <span className="bg-[#FFEFEE] rounded-[7rem]  text-sm font-medium px-3 py-1 text-[#C8322B]">Decline</span>

                        </div>
                    </div>
                    <div>
                        <Image
                            width={50}
                            height={50}
                            src="/icons/ItemsSold.png"
                            alt="Line chart for daily sales"
                        />
                    </div>
                </div>
            </div>

            {/* Profit Made*/}
            <div className='flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-full'>
                <div className='flex items-center mb-4 justify-between'>
                    <h3 className='font-semibold  text-base'>Profit Made</h3>
                    <span className='text-2xl text-[#858C95]'>...</span>
                </div>

                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='text-[1.62rem] mb-4 leading-9 font-semibold'>$390</h3>
                        <div className='flex gap-4 items-center text-[#858C95] font-bold text-sm'>
                            <span className="bg-[#F3FFF6] rounded-[7rem] text-sm font-medium px-3 py-1 text-[#2AA63C]">Rise</span>
                            in profit
                        </div>
                    </div>
                    <div>
                        <Image
                            width={50}
                            height={50}
                            src="/icons/Graphics.png"
                            alt="Line chart for daily sales"
                        />
                    </div>
                </div>
            </div>

            {/* Items In Stock */}
            <div className='flex flex-col shadow-custom rounded-xl px-5 py-4 bg-white w-full'>
                <div className='flex items-center mb-4 justify-between'>
                    <h3 className='font-semibold  text-base'>Items In Stock</h3>
                    <span className='text-2xl text-[#858C95]'>...</span>
                </div>

                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='text-2xl mb-4 leading-9 font-semibold'>200</h3>
                        <div className='flex gap-4 items-center text-[#858C95] font-bold text-sm'>
                            <span className="bg-[#ECF4FC] rounded-[7rem]  text-sm font-medium px-3 py-1 text-[#0A77FF]">+20</span>
                            monthly restock
                        </div>
                    </div>
                    <div>
                        <Image
                            width={50}
                            height={50}
                            src="/icons/Line.png"
                            alt="Line chart for daily sales"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardSalesStats