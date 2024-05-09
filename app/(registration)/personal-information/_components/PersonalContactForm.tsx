import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const PersonalContactForm = () => {
    const { control } = useFormContext()

    return (
        <div className='space-y-2'>
            <FormField control={control} name="lastName" render={({ field }) => (
                <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="facilityRegion" render={({ field }) => (
                <FormItem>
                    <FormLabel>ID(Ghana Card Requirement)</FormLabel>
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

export default PersonalContactForm