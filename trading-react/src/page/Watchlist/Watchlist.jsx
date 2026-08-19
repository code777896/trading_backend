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
import { Bookmark } from 'lucide-react'

const BookmarkFilledIcon = () => <Bookmark className='h-4 w-4 fill-current' />

const Watchlist = () => {
  const handleRemoveToWatchlist=(value)=>{
    console.log(value)
  }


  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Watchlist</h1>
       <Table>
             <TableHeader>
                       <TableRow className="border border-white/10">
                       <TableHead className="py-5">COIN</TableHead>
                       <TableHead>SYMBOL</TableHead>
                       <TableHead>VOLUME</TableHead>
                       <TableHead>MARKET CAP</TableHead>
                       <TableHead>24H</TableHead>
                       <TableHead className="">PRICE</TableHead>
                       <TableHead className="text-right text-red-600">REMOVE</TableHead>
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       {[1,1,1,1,1,1,1,1,1,1,1].map((item, index)=> <TableRow key={index} className="border border-white/10">
                       <TableCell className="font-medium flex items-center gap-2">
                           <Avatar classname="-z-50">
                               <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                           </Avatar>
                           <span>Bitcoin</span>
                       </TableCell>
                       <TableCell>BTC</TableCell>
                       <TableCell>31888383709</TableCell>
                       <TableCell>1298676876476</TableCell>
                       <TableCell>3.35098</TableCell>
                       <TableCell className="">$64747</TableCell>
                       <TableCell className="text-right">
                        <Button variant='ghost' onClick={()=>handleRemoveToWatchlist(item.id)} size='icon' className="h-10 w-10">
                          <BookmarkFilledIcon className="w-6 h-6"/>
                        </Button>
                       </TableCell>
                       </TableRow> )}
                       
                   </TableBody>
               </Table>
    </div>
  )
}

export default Watchlist