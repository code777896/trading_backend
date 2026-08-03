import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

const PaymentDetailsForm = () => {
  const [formData, setFormData] = React.useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    confirmAccountNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='px-2 py-2 text-white'>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Account Holder Name</label>
          <Input
            name='accountHolderName'
            value={formData.accountHolderName}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='John Doe'
          />
        </div>

         <div className='space-y-2'>
          <label className='block text-sm font-medium'>IFSC Code</label>
          <Input
            name='ifscCode'
            value={formData.ifscCode}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='Enter IFSC Code'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Account Number</label>
          <Input
            name='accountNumber'
            value={formData.accountNumber}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='***********5425'
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Confirm Account Number</label>
          <Input
            name='confirmAccountNumber'
            value={formData.confirmAccountNumber}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='Confirm Account Number'
          />
        </div>

       

        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Bank Name</label>
          <Input
            name='bankName'
            value={formData.bankName}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='Yes Bank'
          />
        </div>

        <DialogClose className='w-full'>
            <Button type='submit' className='w-full py-5 text-base font-semibold'>
          Save Details
        </Button>
        </DialogClose>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;