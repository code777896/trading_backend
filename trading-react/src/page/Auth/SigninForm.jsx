import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SigninForm = ({ setJwt }) => {
  const [formData, setFormData] = useState({
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
      const response = await fetch('http://localhost:5454/auth/signin', {
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
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Cannot connect to backend server at http://localhost:5454');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-2 py-2 text-white'>
      <h1 className='text-xl font-bold text-center pb-3'>Login</h1>
      {error && <p className='text-red-400 text-sm text-center pb-2'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-5'>
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
          {loading ? 'Logging in...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default SigninForm;