import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const PersonalNameForm = () => {
    const { control } = useFormContext()


    return (
        <div className='space-y-2 w-full'>
            <FormField control={control} name="firstName" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">First Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home border border-[#E5E5E7]" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="emailAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Email Address</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
             <FormField control={control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Password</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home w-full" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
             <FormField control={control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Confirm Password</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home w-full" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
        </div>
    )
}

export default PersonalNameForm