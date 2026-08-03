import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SigninForm = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
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
      <h1 className='text-xl font-bold text-center pb-3'>Login</h1>
      <form onSubmit={handleSubmit} className='space-y-5'>
        
         <div className='space-y-2'>
          <Input
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='john.doe@gmail.com'
          />
        </div>

        <div className='space-y-2'>
          <Input
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='Your Password'
          />
        </div>


            <Button type='submit' className='w-full py-5 text-base font-semibold'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SigninForm