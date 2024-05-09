'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { PiNumberCircleThree, PiNumberCircleTwo } from "react-icons/pi";



const ReviewAndSubmission = () => {



    return (
        <div className="max-w-[120rem] min-h-screen py-8 mx-auto px-8 bg-home">
            <div className='flex gap-4 items-center ml-6'>
                <Image
                    src="/Procare-Logo.png"
                    width={165}
                    height={66}
                    alt="Procare Logo"
                />
                <span className="font-bold text-3xl">Registration</span>
            </div>


            <div className='flex flex-col items-center mt-8 w justify-center'>
                <h1 className="text-2xl md:text-5xl text-center font-bold mb-4">Review And Submission</h1>
                <p className='mb-8'>Review overall details</p>
                <div className='flex items-center gap-2'>
                    <span className='text-main text-sm flex gap-2 items-center font-semibold'>
                        <IoIosCheckmarkCircle className="text-main text-4xl" />
                        Pharmacy Details
                        <MdLinearScale className="text-main text-xl" />
                    </span>
                    <span className='text-sm flex gap-2 text-main items-center font-semibold'>
                        <PiNumberCircleTwo className=" text-main  text-4xl" />
                        Personal Inforamtion
                        <MdLinearScale />
                    </span>
                    <span className='text-sm flex gap-2 items-center font-semibold text-main'>
                        <PiNumberCircleThree className=" text-main text-4xl" />
                        Review and submit
                    </span>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col md:flex-row md:items-center h-[500px] md:h-[433px] bg-white p-8 text-left gap-8">
                        <div>
                            <h2 className='text-2xl mb-8'>Summary of Account Information:</h2>
                            <p>Facility Name: <span className="text-[#686868] font-normal"> Procare Pharma </span> </p>
                            <p>Facility Number: <span className="text-[#686868] font-normal"> 04333388 </span></p>
                            <p>Facility Email: <span className="text-[#686868] font-normal"> hfhfhfh@gmail.com </span></p>
                            <p>Address: <span className="text-[#686868] font-normal"> N0 45 Backlog Street </span> </p>
                            <p>City: <span className="text-[#686868] font-normal"> Accra </span></p>
                            <p>Region: <span className="text-[#686868] font-normal"> Greater Accra </span></p>
                            <p>Facility Licenese Number: <span className="text-[#686868] font-normal"> 4563-847939-322 </span></p>
                            <p>Ghana Post Address: <span className="text-[#686868] font-normal"> GA-354-233-211 </span></p>
                        </div>
                        <div>
                            <p>First Name: <span className="text-[#686868] font-normal"> John </span></p>
                            <p>Last Name: <span className="text-[#686868] font-normal"> Doe </span></p>
                            <p>Email: <span className="text-[#686868] font-normal"> johndoe@gmail.com </span></p>
                            <p>Ghana Card: <span className="text-[#686868] font-normal"> GHA-12345566789 </span></p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row items-center justify-between mt-4">

                        <Link href="/" className="text-main border-main text-center w-[140px] border-2 rounded-sm px-5 py-2 font-semibold text-sm">
                            Previous
                        </Link>


                        <Button type="submit" className="text-white w-[140px]" variant="secondary">
                            Submit
                        </Button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default ReviewAndSubmission