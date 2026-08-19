import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifiedIcon } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AccountVerificationForm from './AccountVerificationForm'

const Profile = () => {
  const handleEnableTwoStepVerification = () => {
    console.log('Two-step verification');
  }
  return (
    <div className=' flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[50%]'>
        <Card className='bg-[#00001c] border border-white/10 text-white'>
          <CardHeader classname='pb-9 '>
            <CardTitle className='text-xl font-semibold'>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='lg:flex gap-32'>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Email : </p>
                  <p className='text-gray-500'>john.doe@example.com</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Full Name : </p>
                  <p className='text-gray-500'>john doe</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Date of Birth : </p>
                  <p className='text-gray-500'>25/06/1990</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Nationality : </p>
                  <p className='text-gray-500'>Nepali</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Address : </p>
                  <p className='text-gray-500'>Ranighat</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>City : </p>
                  <p className='text-gray-500'>Birgunj</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Postal Code : </p>
                  <p className='text-gray-500'>143109</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Country : </p>
                  <p className='text-gray-500'>Nepal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='mt-6'>
          <Card className='bg-[#00001c] w-full border border-white/10 text-white'>
            <CardHeader classname='pb-7'>
              <div className='flex Items-center gap-3'>
                <CardTitle className='text-xl font-semibold'>2 Step Verification</CardTitle>
              {true?  <Badge classname='space-x-2 bg-green-600 '>
                  <VerifiedIcon />
                  <span>Enabled</span>
                </Badge>:
                <Badge className='bg-orange-500 text-black'>
                  Disabled
                </Badge> }
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button >Enable Two Step Verification</Button>
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