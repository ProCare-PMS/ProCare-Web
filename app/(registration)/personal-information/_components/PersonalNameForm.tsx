import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const PersonalNameForm = () => {
    const { control } = useFormContext()


    return (
        <div className='space-y-2'>
            <FormField control={control} name="firstName" render={({ field }) => (
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField control={control} name="emailAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
             <FormField control={control} name="password" render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-home" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />
             <FormField control={control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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

export default PersonalNameForm