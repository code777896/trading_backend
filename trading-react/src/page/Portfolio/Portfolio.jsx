import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from '@/components/ui/table'

const Portfolio = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
       <Table>
            <TableHeader>
                <TableRow className="border border-white/10">
                <TableHead className="">Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change%</TableHead>
                <TableHead className="text-right">Volume</TableHead>
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
                <TableCell className="text-right">$64747</TableCell>
                </TableRow> )}
                
            </TableBody>
        </Table>
    </div>
  )
}

export default Portfolio