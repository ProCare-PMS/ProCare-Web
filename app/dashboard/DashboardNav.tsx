import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ClipboardList, Settings, Workflow, LineChart, Store, GanttChart } from 'lucide-react';
import DropDown from './_components/DropDown';

const DashboardNav = () => {
    return (
        <header className='fixed top-0 w-full z-20 left-0 bg-[#F5F5F5] backdrop-blur-[12px]'>
            <div className="container mx-auto px-8 flex items-center justify-between h-[5rem]">
                <div>
                    <Image
                        src="/Procare-Logo.png"
                        width={155}
                        height={66}
                        className="mt-[-0.8rem]"
                        alt="Procare Logo"
                    />
                </div>

                <nav className='hidden md:block'>
                    <ul className='flex items-center justify-between gap-9'>
                        <li>
                            <Link href="/" 
                            className='flex gap-2 border-2 sev border-[#2648EA] rounded-[5px] px-5 justify-center mx-auto py-1 bg-white items-center text-sm font-semibold text-[#2648EA]'>
                                <Workflow />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/" 
                            className='flex gap-2 items-center sev text-sm font-semibold text-[#858C95]'>
                                <Store />
                                Pos
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className='flex gap-2 items-center text-sm font-semibold text-[#858C95]'>
                                <ClipboardList />
                                Inventory
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className='flex gap-2 items-center text-sm font-semibold text-[#858C95]'>
                                <LineChart />
                                Analytics
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className='flex gap-2 items-center text-sm font-semibold text-[#858C95]'>
                                <GanttChart />
                                Management
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className='flex gap-2 items-center text-sm font-semibold text-[#858C95]'>
                                <Settings />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className='flex items-center gap-[6px]'>
                    <Image
                        width={30}
                        height={30}
                        src="/icons/Avatar.png"
                        alt='Avatar Icon'
                    />
                    <div>
                    <h2 className='text-sm font-semibold sev'>John Doe</h2>
                    <span className='text-sm font-medium text-[#858C95]'>24/05/2024</span>
                </div>
                    <DropDown />
                </div>
            </div>
        </header>
    )
}

export default DashboardNav