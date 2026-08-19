import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

const WithdrawalForm = () => {
    const [amount, setAmount] = React.useState('')
        const handleChange = (e) => {
            setAmount(e.target.value)
        }
        const handleSubmit = () => {
        console.log(amount)
    }

    return (
        <div className='pt-5 space-y-5 text-white'>
            <div className='flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4'>
                <p>Available balance</p>
                <p>$9000</p>
            </div>
            <div className='flex flex-col items-center text-xl space-y-3'>
                <h1>Enter Withdrawal Amount</h1>
                <div className='flex items-center justify-center w-full bg-slate-900 rounded-md px-2 py-2'>
                    <Input 
                        onChange={handleChange}
                        value={amount}
                        className='WithdrawalInput py-3 border border-white/10 outline-ghost focus:outline-none px-4 text-xl items-center'
                        placeholder="$ 99999"
                        type="number"
                    />
                </div>
            </div>
            <div>
                <p className='pb-2 text-xl'>Transfer to</p>
                <div className='flex items-center gap-5 border border-white/10 px-5 py-2 rounded-md'>
                    <img
                    className='h-10 w-10 object-cover' 
                    src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png" />
                    <div >
                        <p className='text-xl font-bold'>Yes Bank</p>
                        <p className='text-sm text-muted-foreground'>***********1651</p>
                    </div>
                </div>
            </div>
            <DialogClose className='w-full'>
                <Button onClick={handleSubmit} className='w-full py-6 mt-4 text-md font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'>
                 Withdraw
            </Button>
            </DialogClose>
            
        </div>
    )
}

export default WithdrawalForm