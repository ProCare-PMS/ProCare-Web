import React from 'react'
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardNote = () => {
    return (
        <div 
        className="border border-[#2648EA] bg-[#EFF0FE] rounded-xl p-4 flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
                <Home color='blue' />
                <div>
                    <h2 className="text-[#323539] text-center md:text-left text-sm font-semibold">
                        Welcome to Procare Pharmacy management, John Doe
                    </h2>
                    <span className='font-medium  text-[#858C95] text-sm mx-auto'>
                        Your pharmacy number is <span className="font-bold text-[#2648EA]">88</span>. For a seamless
                        Procare exprience save your <br /> pharmacy number
                        now. This will allow you to quickly access you
                        to pharmacy <br /> information and features across the app
                    </span>
                </div>
            </div>

            <div>
                <Button className='bg-[#2648EA] rounded-sm font-semibold text-sm'>
                    Save Number
                </Button>
            </div>
        </div>
    )
}

export default DashboardNote

