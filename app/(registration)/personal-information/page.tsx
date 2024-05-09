'use client'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form';
import PersonalContactForm from './_components/PersonalContactForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdLinearScale } from "react-icons/md";
import { PiNumberCircleThree, PiNumberCircleTwo } from "react-icons/pi";
import PersonalNameForm from './_components/PersonalNameForm';


const formSchema = z.object({
    firstName: z.string({
        required_error: "First Name is required"
    }),
    emailAddress: z.string({
        required_error: "Email Address is required"
    }),
    lastName: z.string({
        required_error: "Last Name is required"
    }),
    number: z.string({
        required_error: "Number is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }),
    confirmPassword: z.string({
        required_error: "Facility Address is required"
    }),
    ghanaCardNumber: z.string({
        required_error: "Region is required"
    }),
})

type FacilityFormData = z.infer<typeof formSchema>

const RegistrationPage = () => {
    const form = useForm<FacilityFormData>({
        resolver: zodResolver(formSchema),
    })


    return (
        <div className="max-w-[120rem] min-h-screen py-8 mx-auto px-8 bg-home">
            <div className='flex gap-4 items-center ml-6'>
                <Image
                    src="/Procare-Logo.png"
                    width={100}
                    height={70}
                    alt="Procare Logo"
                />
                <span className="font-bold text-3xl">Registration</span>
            </div>


            <div className='flex flex-col items-center mt-8 w justify-center'>
                <h1 className="text-2xl md:text-5xl text-center font-bold mb-4">Personal Information</h1>
                <p className='mb-8'>Admin Details</p>
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
                    <span className='text-sm flex gap-2 items-center font-semibold'>
                        <PiNumberCircleThree className=" border-2 border-home text-4xl" />
                        Review and submit
                    </span>
                </div>

                <Form {...form}>
                    <form action="" className="mt-8">
                        <div className="flex flex-col md:gap-4 md:flex-row bg-white p-8 rounded-xl">
                            <PersonalNameForm />
                            <PersonalContactForm />
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between mt-4">

                            <Link href="/" className="text-main border-main text-center w-[140px] border-2 rounded-[1px] px-5 py-2 font-semibold text-sm">
                                Previous
                            </Link>


                            <Button type="submit" className="text-white w-[140px]" variant="secondary">
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