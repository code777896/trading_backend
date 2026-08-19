import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifiedIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AccountVerificationForm from './AccountVerificationForm'

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const jwt = localStorage.getItem('jwt')
      if (!jwt) return
      try {
        const response = await fetch('http://localhost:5454/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleEnableTwoStepVerification = () => {
    console.log('Two-step verification');
  }

  return (
    <div className=' flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[50%]'>
        <Card className='bg-[#00001c] border border-white/10 text-white'>
          <CardHeader className='pb-9 '>
            <div className='flex justify-between items-center'>
              <CardTitle className='text-xl font-semibold'>Your Information</CardTitle>
              {onLogout && (
                <Button onClick={onLogout} variant='destructive' size='sm'>
                  Logout
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className='text-gray-400 text-center py-4'>Loading profile...</p>
            ) : (
              <div className='lg:flex gap-32'>
                <div className='space-y-7'>
                  <div className='flex'>
                    <p className='w-[9rem]'>Email : </p>
                    <p className='text-gray-400'>{user?.email || 'N/A'}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-[9rem]'>Full Name : </p>
                    <p className='text-gray-400'>{user?.fullName || 'N/A'}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-[9rem]'>Role : </p>
                    <p className='text-gray-400'>{user?.role || 'ROLE_CUSTOMER'}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className='mt-6'>
          <Card className='bg-[#00001c] w-full border border-white/10 text-white'>
            <CardHeader className='pb-7'>
              <div className='flex items-center gap-3'>
                <CardTitle className='text-xl font-semibold'>2 Step Verification</CardTitle>
                {user?.twoFactorAuth?.enabled ? (
                  <Badge className='space-x-2 bg-green-600 '>
                    <VerifiedIcon />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className='bg-orange-500 text-black'>
                    Disabled
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Enable Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
                    <DialogHeader>
                      <DialogTitle className='text-white text-xl font-semibold text-center'>Verify your account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile