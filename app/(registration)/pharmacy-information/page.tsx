'use client'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form';
import FacilityNameForm from './_components/FacilityNameForm';
import FacilityContactForm from './_components/FacilityContactForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { PiNumberCircleTwo, PiNumberCircleThree } from "react-icons/pi";


const formSchema = z.object({
    facilityName: z.string({
        required_error: "Facility Name is required"
    }),
    facilityEmailAddress: z.string({
        required_error: "Email Address is required"
    }),
    facilityCity: z.string({
        required_error: "City is required"
    }),
    facilityLincenseNumber: z.string({
        required_error: "License is required"
    }),
    facilityContact: z.string({
        required_error: "Contact is required"
    }),
    facilityAddress: z.string({
        required_error: "Facility Address is required"
    }),
    facilityRegion: z.string({
        required_error: "Region is required"
    }),
    facilityPostalAddress: z.string({
        required_error: "Postal Address is required"
    }),

})

type FacilityFormData = z.infer<typeof formSchema>

const RegistrationPage = () => {
    const form = useForm<FacilityFormData>({
        resolver: zodResolver(formSchema),
    })


    return (
        <div className="max-w-[120rem] min-h-screen py-8 mx-auto px-8 bg-home">
            <div className='flex gap-4 items-center md:ml-6'>
                <Image
                    src="/Procare-Logo.png"
                    width={145}
                    height={70}
                    alt="Procare Logo"
                    className="mt-[-0.8rem]"
                />
                <span className="font-bold text-2xl md:text-3xl">Registration</span>
            </div>


            <div className='flex flex-col items-center mt-[6.12rem] justify-center'>
                <h1 className="text-2xl md:text-5xl text-center font-bold mb-4">Pharmacy Information</h1>
                <p className='mb-8'>Details about your pharmacy</p>
                <div className='flex items-center gap-2'>
                    <span className='text-main text-sm flex gap-2 items-center font-semibold'>
                        <IoIosCheckmarkCircle className="text-main text-3xl md:text-4xl" />
                        Pharmacy Details
                        <MdLinearScale className="text-main text-xl" />
                    </span>
                    <span className='text-sm flex gap-2 items-center font-semibold'>
                        <PiNumberCircleTwo className=" border-2 border-home text-3xl md:text-4xl" />
                        Personal Inforamtion
                        <MdLinearScale />
                    </span>
                    <span className='text-sm flex gap-2 items-center font-semibold'>
                    <PiNumberCircleThree className="border-2 border-home text-3xl md:text-4xl" />
                        Review and submit
                    </span>
                </div>

                <Form {...form}>
                    <form action="" className="mt-8 mb-[5rem]">
                        <div className="flex flex-col md:w-[55.5rem] md:h-[27rem] md:gap-4 md:flex-row bg-white px-[4.62rem] py-[2.12rem] rounded-xl">
                            <FacilityNameForm />
                            <FacilityContactForm />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between mt-[2.81rem]">
                            <p className="text-center md:text-justify">
                                Already have an account? <br />
                                <Link href="/" className="text-main font-semibold text-sm">Login Here</Link>
                            </p>

                            <Button type="submit" className="text-white" variant="secondary">
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default RegistrationPage