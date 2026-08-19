import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignupForm = ({ setJwt }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5454/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        if (setJwt) setJwt(data.jwt);
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Cannot connect to backend server at http://localhost:5454');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-2 py-2 text-white'>
      <h1 className='text-xl font-bold text-center pb-3'>Create New Account</h1>
      {error && <p className='text-red-400 text-sm text-center pb-2'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
          <Input
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            required
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='John Doe'
          />
        </div>

        <div className='space-y-2'>
          <Input
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='john.doe@gmail.com'
          />
        </div>

        <div className='space-y-2'>
          <Input
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
            className='w-full border border-white/10 bg-transparent p-5 text-white placeholder:text-slate-400'
            placeholder='Your Password'
          />
        </div>

        <Button type='submit' disabled={loading} className='w-full py-5 text-base font-semibold'>
          {loading ? 'Creating Account...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;