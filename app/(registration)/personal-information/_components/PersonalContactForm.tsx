import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const PersonalContactForm = () => {
    const { control } = useFormContext()

    return (
        <div className='space-y-2 w-full'>
            <FormField control={control} name="lastName" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Last Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home w-full" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">Number</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home w-full" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityRegion" render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium text-[0.87rem]">ID(Ghana Card Requirement)</FormLabel>
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

export default PersonalContactForm