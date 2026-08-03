import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

const TransferForm = () => {
    const [formData, setFormData] = React.useState({
        amount: '',
        walletId: '',
        purpose: ''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = () => {
        console.log(formData)
    }
    return (
        <div className='pt-5 space-y-5 text-white'>
            <div>
                <h1 className='pb-1'>Enter Amount</h1>
                <Input 
                name="amount"
                onChange={handleChange}
                value={formData.amount}
                className='border border-white/10 py-7'
                placeholder='$ 99999'
                />    
            </div> 
            <div>
                <h1 className='pb-1'>WalletId</h1>
                <Input 
                name="walletId"
                onChange={handleChange}
                value={formData.walletId}
                className='border border-white/10 py-7'
                placeholder='#ADER455'
                />    
            </div>    
            <div>
                <h1 className='pb-1'>Purpose</h1>
                <Input 
                name="purpose"
                onChange={handleChange}
                value={formData.purpose}
                className='border border-white/10 py-7'
                placeholder='Gift for birthday'
                />    
            </div> 
            <DialogClose className='w-full'>
                <Button onClick={handleSubmit} className='w-full py-6 mt-4 text-md font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'>
                    Submit
                </Button>
             </DialogClose>
        </div>
    )
}

export default TransferForm