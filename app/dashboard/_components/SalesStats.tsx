import React from 'react'
import { BarChartHorizontal } from 'lucide-react';

type Props = {
    title: string;
    amount: number;
    color: string;
    icon: React.FC;
    subtitle: string;
    text: string;
}

const SalesStats = ({ title, subtitle, icon: Icon, color, amount, text } : Props) => {
    return (
        <div className='flex flex-col shadow-md rounded-xl shadow-gray-100 p-4 bg-white w-[20rem]'>
            <div className='flex items-center mb-4 justify-between'>
                <h3 className='font-semibold  text-base'>{title}</h3>
                <span className='text-2xl text-[#858C95]'>...</span>
            </div>

            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-[1.62rem] mb-4 leading-9 font-semibold'>{amount}</h3>
                    <div className='flex gap-4 text-[#858C95] font-bold text-sm'>
                        <span 
                        className="bg-[#ECF4FC] rounded-[7rem]  text-sm font-medium px-2 py-1 text-[#0A77FF]">
                            {subtitle}
                        </span>
                        {text}
                    </div>
                </div>
                <BarChartHorizontal size={60} color='blue' />
                <Icon />
                
            </div>

        </div>
    )
}

export default SalesStats