import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AssetTable = () => {
    const navigate = useNavigate()

    return (
        <Table>
            <TableHeader>
                <TableRow className="border border-white/10">
                <TableHead className="w-[100px]">COIN</TableHead>
                <TableHead>SYMBOL</TableHead>
                <TableHead>VOLUME</TableHead>
                <TableHead>MARKET CAP</TableHead>
                <TableHead>24H</TableHead>
                <TableHead className="text-right">PRICE</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item, index)=> <TableRow key={index} className="border border-white/10">
                <TableCell onClick={() => navigate('/market/bitcoin')} className="font-medium flex items-center gap-2">
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
    )
}

export default AssetTable
