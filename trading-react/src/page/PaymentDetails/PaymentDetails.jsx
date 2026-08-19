import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import PaymentDetailsForm from './PaymentDetailsForm'

const PaymentDetails = () => {
  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'>Payment Details</h1>

{true?      <Card className='bg-transparent border border/10 text-white'>
        <CardHeader>
          <CardTitle>
            Yes Bank
          </CardTitle>
          <CardDescription>
            <p>A/C no. </p>

            ***********1234
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center'>
            <p className='w-32'>A/C Holder</p>
            <p className='text-gray-400'> :John Doe</p>
          </div>
          <div className='flex items-center'>
            <p className='w-32'>IFSC</p>
            <p className='text-gray-400'> :YESB0000007</p>
          </div>
        </CardContent>
      </Card> :

      <Dialog>
        <DialogTrigger>
          <Button className='py-6'>Add Payment Details</Button>
        </DialogTrigger>
        <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
          <DialogHeader>
            <DialogTitle className='text-white text-xl font-semibold'>Payment Details</DialogTitle>
            
          </DialogHeader>
          <PaymentDetailsForm />
        </DialogContent>
      </Dialog> }
    </div>
  )
}

export default PaymentDetails