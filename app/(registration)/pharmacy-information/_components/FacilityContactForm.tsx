import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const FacilityContactForm = () => {
    const { control } = useFormContext()


    return (
        <div className='space-y-2 w-full'>
            <FormField control={control} name="facilityContact" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Facility Contact</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Address</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityRegion" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Region</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityPostalAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Postal Address</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
        </div>
    )
}

export default FacilityContactForm