import { Input } from '@/components/ui/input'
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DotIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TradingForm = () => {
    const [orderType, setOrderType] = React.useState('BUY')
    const handleChange = (e) => {

    }

  return (
    <div className='w-full space-y-10 text-white'>
      <div>
        <div className='flex gap-4 items-center justify-between'>
            <Input 
            className='py-6 text-lg border-slate-700 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-slate-500 rounded-lg'
            placeholder='Enter Amount'
            onChange={handleChange}
            type='number'
            name='amount'
            />
            <div>
              <p className='border border-white/10 text-2xl flex items-center justify-center w-30 h-12 rounded-md'>4563</p>
            </div>
        </div>
        {false && <h1 className='text-red-600 text-center pt-4'>Insufficient wallet balance to buy!</h1>}
      </div>
      <div className='flex gap-5 items-center'>
          <div>
            <Avatar>
              <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
            </Avatar>
          </div>
          <div>
            <div className='flex gap-2 items-center'>
              <p>BTC</p>
              <DotIcon className='text-gray-500' />
              <p className='text-gray-500'>Bitcoin</p>
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-xl font-semibold'>$64747</p>
              <p className='text-red-500'>
                <span>-1342342534.123</span>
                <span>(-0.23423%)</span>
              </p>
            </div>
          </div>
      </div>
      <div className='flex items-center justify-between'>
        <p>Order Type</p>
        <p>Market Order</p>
      </div>
      <div className='flex items-center justify-between'>
        <p>{orderType == 'BUY' ? "Available Case" : "Available Quantity"}</p>
        <p>{orderType == 'BUY' ? 9000 : 23.08}</p>
      </div>
      <div>
        <Button className={`w-full py-6 text-lg ${orderType == 'SELL' ? "bg-red-600 hover:bg-red-700" : ""}`}>
          {orderType}
        </Button>
        <Button 
        variant='link'
        className='w-full mt-5 text-xl text-gray-500 hover:text-gray-400'
        onClick={() => setOrderType(orderType == 'BUY' ? 'SELL' : 'BUY')}>
          {orderType == 'BUY' ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  )
}

export default TradingForm