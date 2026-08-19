import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, DotIcon } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TradingForm from './TradingForm'
import StockChart from '../Home/StockChart'

const BookmarkFilledIcon = ({ className }) => (
  <BookmarkIcon className={`${className ?? ''} fill-current`} />
)

const StockDetails = () => {
  return (
    <div className='p-5 mt-5'>
      <div className=' flex justify-between'>
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
        <div className='flex gap-4 items-center'>
          <Button className='w-[3rem] py-5 mt-4 text-md font-semibold hover:bg-blue-700 text-white transition-colors'>
          {true ?  <BookmarkFilledIcon className='w-10 h-10' /> :
            <BookmarkIcon className='w-10 h-10' /> }
          </Button>
          <Dialog>
          <DialogTrigger>
            <Button className='w-full py-5 mt-4 text-md font-semibold hover:bg-blue-700 text-white transition-colors' size='lg'>Trade</Button>
          </DialogTrigger>
            <DialogContent className='bg-[#020214] border-slate-700 p-6 max-w-md rounded-2xl'>
              <DialogHeader>
                <DialogTitle className='text-white text-xl font-semibold text-center'>How much do you want to trade?</DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='mt-14'>
        <StockChart />
      </div>
    </div>
  )
}

export default StockDetails