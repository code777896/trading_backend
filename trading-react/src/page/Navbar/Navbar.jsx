import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, Search } from 'lucide-react'
import SideBar from './sideBar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const Navbar = () => {
  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center border-white/50'>
      <div className='flex items-center gap-3'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full h-11 w-11'>
              <Menu className='w-7 h-7' />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-72 border-r-0 flex flex-col justify-start bg-[#00001c] text-white h-screen p-0 m-0' side='left'>
            <SheetHeader>
              <SheetTitle>
                <div className='text-3xl flex justify-center items-center gap-2'>
                  <img
                    src='/bnb-coin-icon.webp'
                    className='w-16 h-16 rounded-full object-cover object-center flex-shrink-0'
                  />
                  <div className='flex items-center gap-1'>
                    <span className='font-bold text-orange-700'>Bull</span>
                    <span>Trade</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <SideBar />
          </SheetContent>
        </Sheet>
        <p className='text-sm lg:text-base cursor-pointer'>
          BullTrade
        </p>
        <div className='p-0 ml-9'>
            <Button variant='ghost' 
            className=' border border-white/10 rounded-none'>
            <Search className='w-5 h-5' />
            <span>Search</span>
          </Button>
        </div>
        
      </div>
      <div>
        <Avatar>
          <AvatarFallback>
            B
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar
            