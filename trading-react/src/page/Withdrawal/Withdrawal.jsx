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

const Withdrawal = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
       <Table>
             <TableHeader>
                       <TableRow className="border border-white/10">
                       <TableHead className="py-5">Date</TableHead>
                       <TableHead>Method</TableHead>
                       <TableHead>Amount</TableHead>
                       <TableHead className="text-right">Status</TableHead>
                       </TableRow>
                   </TableHeader>
                   <TableBody>
                       {[1,1,1,1,1,1,1,1,1,1,1].map((item, index)=> <TableRow key={index} className="border border-white/10">
                       <TableCell>
                        <p>june 12 2026 at 14:00</p>
                       </TableCell>
                       <TableCell>Bank Account</TableCell>
                       <TableCell className="">$64747</TableCell>
                       <TableCell className="text-right"> 234 </TableCell>
                       </TableRow> )}
                       
                   </TableBody>
               </Table>
    </div>  )
}

export default Withdrawal