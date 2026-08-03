import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button';

const AccountVerificationForm = () => {
    const [value, setValue] = React.useState("")
    const handleSubmit = () => {
        console.log(value)
    }

    return (
        <div className='flex justify-center text-white'>
            <div className='space-y-3 mt-5 w-full'>
                <div className='flex justify-between items-center'>
                    <p>Email : </p>
                    <p>john.doe@example.com</p>
                    <Dialog>
                        <DialogTrigger className='border border-slate-500 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors'>
                            Sent OTP
                        </DialogTrigger>
                        <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
                            <DialogHeader>
                            <DialogTitle className='text-white text-xl font-semibold text-center'>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div className='py-5 flex gap-5 justify-center items-center text-white '>
                                  <InputOTP 
                                  value={value}
                                  onChange={(value) => setValue(value)}
                                  maxLength={6}
                                 >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose className='w-full'>
                                    <Button onClick={handleSubmit} className='w-[7rem] py-4 text-md font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'>
                                    Submit
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
export default AccountVerificationForm;