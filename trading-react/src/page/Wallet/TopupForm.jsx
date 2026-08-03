import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from "react";

const TopupForm = () => {
    const [amount, setAmount] = React.useState('')
    const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY")
    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value)
    }
    const handleChange = (e) => {
        setAmount(e.target.value)
    }
    const handleSubmit = () => {
        console.log(amount, paymentMethod)
    }
    return (
        <div className='w-full space-y-6 text-white'>
            <div className='space-y-2'>
                <Label htmlFor='amount' className='text-sm font-medium text-gray-200'>Enter Amount</Label>
                <Input 
                id='amount'
                onChange={handleChange}
                value={amount}
                className='py-6 text-lg border-slate-700 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-slate-500 rounded-lg'
                placeholder='$ 99999'
                />
            </div>
            <div className='space-y-2'>
                <Label className='text-sm font-medium text-gray-200'>Select Payment Method</Label>
                <RadioGroup 
                onValueChange={(value)=>handlePaymentMethodChange(value)}
                className='grid grid-cols-2 gap-4 w-full' 
                defaultValue='RAZORPAY'>
                    <div className='flex items-center space-x-3 border border-slate-800 bg-slate-900/40 p-3 rounded-lg hover:border-slate-500 transition-colors w-full'>
                        <RadioGroupItem 
                        className='h-5 w-5 border-slate-500 bg-slate-800 text-white'
                        value='RAZORPAY'
                        id='razorpay'
                        />
                        <Label htmlFor='razorpay' className='flex-1 cursor-pointer'>
                            <div className='bg-white rounded-md p-1.5 flex items-center justify-center h-10 w-full'>
                                <img className='h-6 object-contain' src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" />
                            </div>
                        </Label>
                    </div>

                     <div className='flex items-center space-x-3 border border-slate-800 bg-slate-900/40 p-3 rounded-lg hover:border-slate-500 transition-colors w-full'>
                        <RadioGroupItem 
                        className='h-5 w-5 border-slate-500 bg-slate-800 text-white'
                        value='STRIPE'
                        id='stripe'
                        />
                        <Label htmlFor='stripe' className='flex-1 cursor-pointer'>
                            <div className='bg-white rounded-md p-1.5 flex items-center justify-center h-10 w-full'>
                                <img className='h-6 object-contain' 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/960px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" />
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <DialogClose className='w-full'>
                <Button onClick={handleSubmit} className='w-full py-6 mt-4 text-md font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'>
                Submit
            </Button>
            </DialogClose>
            
        </div>
    )
}

export default TopupForm