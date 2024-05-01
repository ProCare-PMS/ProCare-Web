import React from 'react'
import Login from '@/components/Login/login'
import SignAuthLayout from '../sign-auth/layout'



export default function page() {
  return (
    <SignAuthLayout>
        <Login />
    </SignAuthLayout>
  )
}