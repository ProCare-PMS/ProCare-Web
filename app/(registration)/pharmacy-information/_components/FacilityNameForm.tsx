import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const FacilityNameForm = () => {
    const { control } = useFormContext()


    return (
        <div className='space-y-2'>
            <FormField control={control} name="facilityName" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-sm">Facility Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityEmailAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-sm">Facility Email Address</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
             <FormField control={control} name="facilityCity" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-sm">City</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
             <FormField control={control} name="facilityLicenseNumber" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-sm">Facility License Number</FormLabel>
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

export default FacilityNameForm