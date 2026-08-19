import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from '@/components/ui/table'

const Activity = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>
       <Table>
             <TableHeader>
                       <TableRow className="border border-white/10">
                       <TableHead className="py-5">Date & Time</TableHead>
                       <TableHead>Trading Pair</TableHead>
                       <TableHead>Buy Price</TableHead>
                       <TableHead>Selling Price</TableHead>
                       <TableHead>Order Type</TableHead>
                       <TableHead className="">Profit/Loss</TableHead>
                       <TableHead className="text-right">Value</TableHead>
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       {[1,1,1,1,1,1,1,1,1,1,1].map((item, index)=> <TableRow key={index} className="border border-white/10">
                       <TableCell>
                        <p>27/07/2026</p>
                        <p className='text-gray-400'>14:50:30</p>
                       </TableCell>
                       <TableCell className="font-medium flex items-center gap-2">
                           <Avatar classname="-z-50">
                               <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                           </Avatar>
                           <span>Bitcoin</span>
                       </TableCell>
                       <TableCell>31888383709</TableCell>
                       <TableCell>1298676876476</TableCell>
                       <TableCell>3.35098</TableCell>
                       <TableCell className="">$64747</TableCell>
                       <TableCell className="text-right">
                       </TableCell>
                       </TableRow> )}
                       
                   </TableBody>
               </Table>
    </div>
  )
}

export default Activity