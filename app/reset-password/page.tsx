import React from 'react'
import SignAuthLayout from '../sign-auth/layout'
import ResetPassword from '@/components/Reset-password/reset-password'

export default function page() {
  return (
    <SignAuthLayout>
      <ResetPassword />
    </SignAuthLayout>
  )
}
